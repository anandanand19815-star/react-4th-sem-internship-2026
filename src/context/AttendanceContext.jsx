import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { addDays, format } from 'date-fns'

const AttendanceContext = createContext()

const initialBatches = [
  {
    id: 'batch-1',
    name: 'Frontend Masters',
    trainer: 'Trainer One',
    startDate: '2026-05-01',
    endDate: '2026-08-31',
  },
  {
    id: 'batch-2',
    name: 'Data Science Sprint',
    trainer: 'Training Manager',
    startDate: '2026-06-01',
    endDate: '2026-09-30',
  },
]

const initialStudents = [
  {
    id: 'student-1',
    name: 'Aisha Patel',
    email: 'aisha.patel@example.com',
    mobile: '9876543210',
    batchId: 'batch-1',
  },
  {
    id: 'student-2',
    name: 'Rohan Singh',
    email: 'rohan.singh@example.com',
    mobile: '9123456780',
    batchId: 'batch-2',
  },
]

const createDefaultAttendance = () => {
  const today = new Date()
  return [
    {
      id: uuidv4(),
      studentId: 'student-1',
      batchId: 'batch-1',
      date: format(today, 'yyyy-MM-dd'),
      status: 'present',
    },
    {
      id: uuidv4(),
      studentId: 'student-2',
      batchId: 'batch-2',
      date: format(today, 'yyyy-MM-dd'),
      status: 'absent',
    },
  ]
}

export const AttendanceProvider = ({ children }) => {
  const [batches, setBatches] = useState([])
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState([])
  const [dateFilter, setDateFilter] = useState('today')
  const [customRange, setCustomRange] = useState({ from: '', to: '' })

  useEffect(() => {
    const stored = localStorage.getItem('tsa-data')
    if (stored) {
      const parsed = JSON.parse(stored)
      setBatches(parsed.batches)
      setStudents(parsed.students)
      setAttendance(parsed.attendance)
    } else {
      setBatches(initialBatches)
      setStudents(initialStudents)
      setAttendance(createDefaultAttendance())
    }
  }, [])

  useEffect(() => {
    const payload = { batches, students, attendance }
    if (batches.length || students.length || attendance.length) {
      localStorage.setItem('tsa-data', JSON.stringify(payload))
    }
  }, [batches, students, attendance])

  const addBatch = (batch) => {
    setBatches((prev) => [...prev, { ...batch, id: uuidv4() }])
  }

  const updateBatch = (id, batch) => {
    setBatches((prev) => prev.map((item) => (item.id === id ? { ...item, ...batch } : item)))
  }

  const removeBatch = (id) => {
    setBatches((prev) => prev.filter((item) => item.id !== id))
    setStudents((prev) => prev.filter((student) => student.batchId !== id))
    setAttendance((prev) => prev.filter((record) => record.batchId !== id))
  }

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: uuidv4() }])
  }

  const updateStudent = (id, student) => {
    setStudents((prev) => prev.map((item) => (item.id === id ? { ...item, ...student } : item)))
  }

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((item) => item.id !== id))
    setAttendance((prev) => prev.filter((record) => record.studentId !== id))
  }

  const markAttendance = ({ studentId, batchId, date, status }) => {
    setAttendance((prev) => {
      const existing = prev.find((item) => item.studentId === studentId && item.date === date)
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, status, batchId } : item,
        )
      }
      return [...prev, { id: uuidv4(), studentId, batchId, date, status }]
    })
  }

  const bulkUpdate = ({ batchId, date, status }) => {
    const batchStudents = students.filter((student) => student.batchId === batchId)
    setAttendance((prev) => {
      const filtered = prev.filter((record) => record.date !== date || record.batchId !== batchId)
      const newRecords = batchStudents.map((student) => ({
        id: uuidv4(),
        studentId: student.id,
        batchId,
        date,
        status,
      }))
      return [...filtered, ...newRecords]
    })
  }

  const filteredAttendance = useMemo(() => {
    const now = new Date()
    const filterRange = {
      today: { from: now, to: now },
      yesterday: { from: addDays(now, -1), to: addDays(now, -1) },
      last7: { from: addDays(now, -6), to: now },
      last30: { from: addDays(now, -29), to: now },
    }
    let from = now
    let to = now
    if (dateFilter === 'custom') {
      from = customRange.from ? new Date(customRange.from) : now
      to = customRange.to ? new Date(customRange.to) : now
    } else if (filterRange[dateFilter]) {
      from = filterRange[dateFilter].from
      to = filterRange[dateFilter].to
    }
    const formattedFrom = format(from, 'yyyy-MM-dd')
    const formattedTo = format(to, 'yyyy-MM-dd')
    return attendance.filter((record) => record.date >= formattedFrom && record.date <= formattedTo)
  }, [attendance, dateFilter, customRange])

  const value = useMemo(
    () => ({
      batches,
      students,
      attendance,
      filteredAttendance,
      dateFilter,
      customRange,
      setDateFilter,
      setCustomRange,
      addBatch,
      updateBatch,
      removeBatch,
      addStudent,
      updateStudent,
      removeStudent,
      markAttendance,
      bulkUpdate,
    }),
    [
      batches,
      students,
      attendance,
      filteredAttendance,
      dateFilter,
      customRange,
    ],
  )

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>
}

export const useAttendance = () => useContext(AttendanceContext)
