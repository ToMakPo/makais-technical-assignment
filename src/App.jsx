import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)

  const maxPerPage = 10

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('http://localhost:3001/api/users')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setUsers(data.sort((a, b) => a.fname.localeCompare(b.fname)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }

    setSelectedUser(users.length > 0 ? users[0] : null)
    setPage(1)
  }

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => 
        filter === '' ||
        user.fname.toLowerCase().includes(filter.toLowerCase()) || 
        user.lname.toLowerCase().includes(filter.toLowerCase())
      )
    )

    const maxPage = Math.ceil(filteredUsers.length / 10) || 1
    if (page > maxPage) setPage(maxPage)
    if (page < 1) setPage(1)
  }, [users, filter, filteredUsers.length, page])


  const fetchProfileImage = (eid) => {
    return `http://localhost:3001/api/users/image/${eid}`
  }

  return (
    <div className="App">
      <h1>Employee Directory</h1>
      <button onClick={fetchUsers} disabled={loading} style={{ marginBottom: 16 }}>
        {loading ? 'Loading...' : 'Get Employees'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {users.length > 0 && (
        <div id="user-info">
          <div id="user-list">
            <div id="filter-container">
              <input
                type="text"
                placeholder="Filter by first or last name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {filter && <button onClick={() => setFilter('')}>⨯</button>}
            </div>
            <ul>
              {filteredUsers
                .slice((page - 1) * 10, page * 10)
                .map((user, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedUser(user)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: selectedUser?.eid === user.eid ? 'bold' : 'normal',
                  }}
                  data-selected={selectedUser?.eid === user.eid}
                >
                  <img
                    src={fetchProfileImage(user.eid)}
                    alt={`${user.fname} ${user.lname}`}
                    style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8, verticalAlign: 'middle' }}
                  />
                  {user.fname} {user.lname}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                style={{ marginRight: 8 }}
              >
                {`<`}
              </button>
              <button
                onClick={() => setPage(Math.min(Math.ceil(filteredUsers.length / maxPerPage), page + 1))}
                disabled={page === Math.ceil(filteredUsers.length / maxPerPage)}
              >
                {`>`}
              </button>
            </div>
          </div>
        
          <div id='user-details'>
            {selectedUser && (
            <div className='user-details-card'>
              <img 
                src={fetchProfileImage(selectedUser.eid)} 
                alt={`${selectedUser.fname} ${selectedUser.lname}`} 
                style={{ width: 150, borderRadius: '50%' }} 
              />
              <div>
                <span id='users-name'><h3>{selectedUser.fname} {selectedUser.lname}</h3></span>
                <p><strong>Position:</strong> {selectedUser.role}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
