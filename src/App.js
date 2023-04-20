import { useEffect } from 'react';
import './App.css';
import StudentList from './components/StudentList/StudentList'
import StudentContext from './store/StudentContext'
import useFetch from './hooks/useFetch';


function App() {

  const {data: studentData, isLoading, isError, fetchData} = useFetch()

  // 发送请求获取数据
  useEffect(() => {
    fetchData({
      url: 'students'
    })
  }, [fetchData])

  return (
    <StudentContext.Provider value={{fetchData: () => {fetchData({url: 'students'})}}}>
      <div className='student-table'>
        {!isLoading && !isError && <StudentList data={studentData}/>}
        {isLoading && <p>正在加载中...</p>}
        {isError && <p>加载失败!</p>}
      </div>
    </StudentContext.Provider>
  );
}

export default App;
