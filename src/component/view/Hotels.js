import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../util/host-utils';
import { useEffect } from 'react';
import { getLoginUserInfo } from '../../util/login-utils';

const HotelCarousel = () => {

  const [hotels, setHotels] = useState([]);
  // const [address, setAddress] = useState("서울특별시");
  const token = getLoginUserInfo().token;
  const address = "서울특별시";
  const requestHeader = {
    'content-type' : 'application/json',
    'Authorization' : 'Bearer ' + token
  };
  useEffect(() => {
    fetch(`${API_BASE_URL}/hotel/${address}`, {
      method: "GET",
      headers: requestHeader,
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      // setHotels(json)
    })
  })
  
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(hotels.length / pageSize);
  const paginatedHotels = hotels.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridGap: '10px',
        }}
      >
        {paginatedHotels.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              border: '1px solid #b1bff9',
              margin: '5px 20px',
              borderRadius: '15px',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              style={{ width: '100%', height: '225px', objectFit: 'cover' }}
            />
            <div style={{ marginTop: '10px', textAlign: 'left' }}>
              <h2 style={{ margin: '10px' }}>{hotel.name}</h2>
              <p style={{ margin: '10px' }}>{hotel.description}</p>
            </div>
            <button
              style={{
                marginTop: 'auto',
                padding: '5px 10px',
                backgroundColor: '#b1bff9',
                color: '#fff',
                border: 'none',
                borderRadius: '7px',
              }}
            >
              <Link to="/checkOut" className='out'>예약하기</Link>
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0  }
          style={{
            marginRight: '10px',
            padding: '5px 10px',
            backgroundColor: '#b1bff9',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          이전
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageCount - 1}
          style={{
            marginTop: 'auto',
            padding: '5px 10px',
            backgroundColor: '#b1bff9',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default HotelCarousel;
