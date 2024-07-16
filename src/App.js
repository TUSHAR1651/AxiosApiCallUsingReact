import logo from './logo.svg';
import './App.css';
import './useBookSearch';
import { useState, useRef , useCallback } from 'react';
import useBookSearch from './useBookSearch';
function App() {
  const [query, setQuery] = useState(''); 
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef();
  

  function handleSearch(e){
    setQuery(e.target.value);
    setPageNumber(1);
  }
  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber);

  return (
    <div>
      <input type = "text" onChange={handleSearch}></input>
      {books.map((book , index)  =>{
        
          return <div key = {book}>{book}</div>
        
      })
      }
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'error'}</div>
    </div>
  
  );
}

export default App;
