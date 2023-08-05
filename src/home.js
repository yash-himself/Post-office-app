let mapBox = document.getElementById('mapBox')

let locations = JSON.parse(sessionStorage.getItem('location'))
let ipAddress = sessionStorage.getItem('ip')



// integreting map
mapBox.innerHTML = ` <h2 style="color:rgb(164, 154, 210);"> Your Current Location</h2>
 <iframe src="https://maps.google.com/maps?q=${locations[0]}, ${locations[1]}&z=15&output=embed" width="60%" height="400px" frameborder="0" style="border:0"></iframe>`




fetch("https://ipinfo.io/json?token=c7e374e3ab331a").then(
    (response) => response.json()
).then(
    (data) => {
        console.log(data)
        let infoBox = document.getElementsByClassName('container')[0];
        infoBox.innerHTML = `
 
    <h2 style="color: gray;">IP Address: <span style="color: aliceblue;" id="ipAdd">${ipAddress} </span></h2>
    <div class="infoBox">
        <div style="margin-top: 20px; display: flex;justify-content: space-between; color: gray;">
            <p>Lat: ${locations[0]}</p>
            <p>City: ${data.city}</p>
            <p>Organisation: ${data.org}</p>
            </div>
        <div style="margin-top: 10px; display: flex;justify-content: space-between; color: gray;">
            <p>Long: ${locations[1]}</p>
            <p>Region: ${data.region}, ${data.country}</p>
            <p>Hostname: ${window.location.hostname}</p>
        </div>
    </div>
    
    `
        let date  = new Date().toLocaleString("en-US", { timeZone: data.timezone });

        let moreInfo = document.getElementById('moreInfo')
        let moreInfoCard = document.createElement('div')
            moreInfoCard.className = 'moreInfoCard'
            moreInfoCard.innerHTML = `
                    <p>Time Zone: ${data.timezone}</p>
                    <p>Date and Time: ${date}</p>
                    <p>Pincode: ${data.postal}</p>
                    <p>Message: <span id="message"></span></p>`
        moreInfo.appendChild(moreInfoCard);

        fetch(`https://api.postalpincode.in/pincode/${data.postal}`
        ).then(
            (response) => response.json()
        ).then(
            (data) => {
                document.getElementById('message').innerText = data[0].Message
                renderpostOffices(data[0])
                sessionStorage.setItem('officeData', JSON.stringify(data[0].PostOffice))
        })
        .catch(err=>console.log('failed to fetch post offices',err))
        
    }
)
.catch(err=> console.log(err))



// Nearby post offices 
function renderpostOffices(data){
    console.log(data.PostOffice)

    data.PostOffice.forEach(office => {
        
        let officeCard = document.createElement('div')
        officeCard.className = 'office'
        officeCard.innerHTML = `
        <p>Name: ${office.Name}</p>
        <p>Branch Type: ${office.BranchType}</p>
        <p>Delivery Status: ${office.DeliveryStatus}</p>
        <p>District: ${office.District}</p>
        <p>Division: ${office.Division}</p>
        
        `
        document.getElementById('allpo').appendChild(officeCard)

    });
}


function renderSearch(){
   data= JSON.parse(sessionStorage.getItem('officeData'));
   let input = document.getElementById('searchBar').value;
   input.toLowerCase()
    if(input !=''){

    let needData = data.filter((x)=>x.Name.toLowerCase().includes(input))
   for(let i=0;i<needData.length;i++){
    // if (needData[i].Name.includes(input)) {
        let officeCard = document.createElement('div')
        officeCard.className = 'office'
        officeCard.innerHTML = `
        <p>Name: ${needData[i].Name}</p>
        <p>Branch Type: ${needData[i].BranchType}</p>
        <p>Delivery Status: ${needData[i].DeliveryStatus}</p>
        <p>District: ${needData[i].District}</p>
        <p>Division: ${needData[i].Division}</p>`
        document.getElementById('searchContainer').innerHTML=''
        document.getElementById('searchContainer').appendChild(officeCard)
    // }
   }}
   else{
    document.getElementById('searchContainer').innerHTML=''
   }
}





 


