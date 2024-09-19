
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function penjualan(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getData();
    }, [])

    const onDeleteClick = data => {
        if (!window.confirm("Are you sure you want to delete this data?")) {
          return
        }
        axiosClient.delete(`/penjualan/${data.id}`)
          .then(() => {
            getData()
          })
      }

    const getData = () => {
        setLoading(true)
        axiosClient.get('/penjualan')
          .then(({ data }) => {
            setLoading(false)
            setData(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Data Penjualan</h1>
          <Link className="btn-add" to="/users/new">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {data.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}
