import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const MakeChart = props => {
  const {details} = props
  const graphDict = [
    {
      day: 'Sun',
      credit: 0,
      debit: 0,
    },
    {
      day: 'Mon',
      credit: 0,
      debit: 0,
    },
    {
      day: 'Tue',
      credit: 0,
      debit: 0,
    },
    {
      day: 'Wed',
      credit: 0,
      debit: 0,
    },
    {
      day: 'Thu',
      credit: 0,
      debit: 0,
    },
    {
      day: 'Fri',
      credit: 0,
      debit: 0,
    },
    {
      day: 'Sat',
      credit: 0,
      debit: 0,
    },
  ]

  details.map(eachItem => {
    const {date} = eachItem
    const D = new Date(date)
    const day = D.getDay()
    if (eachItem.type === 'credit') {
      graphDict[day].credit += eachItem.sum
    } else {
      graphDict[day].debit += eachItem.sum
    }
    return eachItem
  })

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={graphDict}
          width={800}
          height={400}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />

          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="credit" fill="#1f77b4" />
          <Bar dataKey="debit" fill="#fd7f0e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default MakeChart
