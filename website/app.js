
/* Global Variables */
let BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
let API_Key = "31431447a7a984ffd53c6b6b666d137d";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performane)

async function performane(e) {
    e.preventDefault();
    // Get User Input Value.
    const Zip_Code = document.getElementById("zip").value;
    console.log(Zip_Code, "zip");
    const User_Felling = document.getElementById("feelings").value;
    console.log(User_Felling, "feeling");
    const data = {
        userIputZip: Zip_Code,
        userInputFelling: User_Felling,
        userInputDate: newDate
    }
    getWether(BASE_URL, Zip_Code, API_Key)
        .then(function (data) {
            console.log(data, "data")
            postData("http://localhost:8000/addWeatherData", { date: newDate, temperature: data.temp, user_response: User_Felling })

        })
        .then(function () {
            updateUI(data);
        })
}
// document.getElementById("generate").addEventListener("click", () => {
//     console.log("click")
//     const Zip_Code = document.getElementById("zip").value;
//     console.log(Zip_Code, "zip");
//     const User_Felling = document.getElementById("feelings").value;
//     console.log(User_Felling, "feeling");

//     /* Function called by event listener */
//     getWether(BASE_URL, Zip_Code, API_Key);
// })


//function TO GET Web API Data
const getWether = async (BASE_URL, Zip_Code, API_Key) => {
    const URL = `${BASE_URL}?zip=${Zip_Code}&appid=${API_Key}`;
    console.log(URL, "url");
    const response = await fetch(URL);
    console.log(response, "response")
    try {
        // const data = await response.json()
        // console.log(data, "data")
        const { main } = await response.json()
        console.log(main, "main")
        return main;
    } catch (err) {
        console.log(err)
    }
}


//Async Post
const postData = async (url = '', data = {}) => {
    console.log(data, "data2")
    console.log(url, "url2")
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData, "newData")
        return newData;

    } catch (error) {
        console.log(error, "error")
    }


}



// Update user interface
const updateUI = async (data) => {
    const request = await fetch("http://localhost:8000/all")
    try {
        const allData = await request.json();
        console.log(allData, "all adta");
        document.getElementById("date").innerHTML = allData[0].date;
        document.getElementById("temp").innerHTML = allData[0].temperature;
        document.getElementById("content").innerHTML = allData[0].user_response;

    } catch (error) {
        console.log(error);
    }

}