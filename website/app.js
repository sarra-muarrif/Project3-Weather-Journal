
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
    let Zip_Code = document.getElementById("zip").value;
    let User_Felling = document.getElementById("feelings").value;
    //Call Back Function To Get Web API Data
    getWether(BASE_URL, Zip_Code, API_Key)
        //Call Back Function To Post Data
        .then(function (data) {
            postData("http://localhost:8000/addWeatherData", { date: newDate, temperature: data.temp, user_response: User_Felling })

        })
        .then(function () {
            updateUI();
        })
}

//function TO GET Web API Data
const getWether = async (BASE_URL, Zip_Code, API_Key) => {
    const URL = `${BASE_URL}?zip=${Zip_Code}&appid=${API_Key}`;
    const response = await fetch(URL);
    try {
        const { main } = await response.json()
        return main;
    } catch (err) {
        console.log(err)
    }
}


//Async Post
const postData = async (url = '', data = {}) => {
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
        return newData;

    } catch (error) {
        console.log(error, "error")
    }


}

// Update user interface
const updateUI = async () => {
    const request = await fetch("http://localhost:8000/all")
    try {
        const allData = await request.json();
        for (let i = 0; i < allData.length; i++) {
            const { date, temperature, user_response } = allData[i];
            document.getElementById("date").innerHTML = `Date: ${date}`;
            document.getElementById("temp").innerHTML = `Temperature: ${temperature}`;
            document.getElementById("content").innerHTML = `Feeling: ${user_response}`;
        }

    } catch (error) {
        console.log(error);
    }

}