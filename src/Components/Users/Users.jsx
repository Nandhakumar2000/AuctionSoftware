import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { Table, Button, Space } from 'antd';
import { AppContext } from '../../context';

export default function UserList(){
   const [data,setData] = useState([]);
   const [sortedInfo,setSortedInfo] = useState(null);

   const { dispatchUserEvent } = useContext(AppContext);

   const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo?.columnKey === 'id' && sortedInfo?.order,
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        ellipsis: true,
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
        sortOrder: sortedInfo?.columnKey === 'first_name' && sortedInfo?.order,
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        ellipsis: true,
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      sortOrder: sortedInfo?.columnKey === 'last_name' && sortedInfo?.order,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
      },
];

  

    useEffect(()=>{
      axios.get("https://reqres.in/api/users").then((response)=>{
          setData(response.data.data);
      })
    },[]);

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
      };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'id',
          });
      };
      const setFirstNameSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'first_name',
          });
      };
      const setLastNameSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'last_name',
          });
      };

    return <div>
        <h1>User List</h1>
        <Space style={{ marginBottom: 16 }}>

        <Button onClick={()=>{setAgeSort()}}>Sort ID</Button>
        <Button onClick={()=>{setFirstNameSort()}}>Sort First Name</Button>
        <Button onClick={()=>{setLastNameSort()}}>Sort Last Name</Button>

        </Space>
        <Table columns={columns} dataSource={data} pagination={false} onChange={handleChange}/>

        <Button style={{position:'absolute',right:'20px',bottom:'30px'}} danger={true}  onClick={()=>{dispatchUserEvent('LOGOUT', { token:null});}}>LogOut</Button>

    </div>
}