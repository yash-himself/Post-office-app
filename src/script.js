
const ipAddressbox = document.getElementById('ipAddress')
const getIpbtn = document.getElementById('btn')



getIpbtn.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition(position =>{
        const {latitude, longitude} = position.coords;
        sessionStorage.setItem('location', JSON.stringify([latitude,longitude]))
    })
    window.location.href='./src/home.html'
})

//ip address 
fetch("https://api.ipify.org?format=json")
.then(response=> response.json())
.then(data=> {ipAddressbox.innerText=`Your IP Adress is: ${data.ip}`;sessionStorage.setItem('ip' , data.ip) })
.catch(err=> console.log(err))



