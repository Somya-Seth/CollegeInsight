import React from 'react';
import './PostCard.css';
import Card from 'react-bootstrap/Card';
import { format } from "timeago.js";

export default function PostCard({ UserData, postData }) {
  const showProfilePicture = (val) => {
    var blob = new Blob([Int8Array.from(val?.data?.data)], { type: val?.contentType });
    return window.URL.createObjectURL(blob);
}
const showImg = (val) => {
  var blob = new Blob([Int8Array.from(val?.data?.data)], { type: val?.contentType });
  return window.URL.createObjectURL(blob);
}
  return (
    <div className='root_postcard'>
      {postData.length > 0 &&

        (
          <div>
            {
              postData.map((item, index) => (
                <Card key={index} className='activity_card' style={{ width: '50vw', marginBottom: '2rem' }}>
                  <div className='activity_details'>
                    <div>
                      <img src={
                        UserData?.profilePicture ? showProfilePicture(UserData?.profilePicture) :
                          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
                      }
                        className='post_image'></img>
                    </div>
                    <p style={{ width: '70%', marginTop: '0.5rem' }}>You</p>
                    <div className='timeago__'>{format(item?.date)}</div>
                  </div>
                  <div className='text__'>
                    {item.text}
                  </div>
                  {item?.img && (
                    <>
                      <div className='post_img__'>
                        <img className='post_img' src={showImg(item?.img)}></img>
                      </div>

                    </>
                  )}
                  {/* {
                        item?.doc ? (
                            <Document Document file={item?.doc} onLoadSuccess={true} >
                              <Page pageNumber={pageNumber} />
                            </Document>
                         ) : ''
                    } */}
                </Card>
              ))}
          </div>
        )

      }



    </div>
  )
}
