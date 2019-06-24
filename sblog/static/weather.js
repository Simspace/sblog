/***
 * Stupid simple weather fetcher
 **/

get_api_key=function(){
    return "b2a6f03068093d5f7c93cffb33595787"
}

get_weather_for_loc_fn=function(){
    loc = document.getElementById("wthr_loc")
    loc_val = loc.value
    
    if(loc_val.length == 0){
    /*No location provided, use geo location*/
        if(navigator.geolocation){
            loc_val = navigator.geolocation.getCurrentPosition(show_position_fn)
        }else{
            loc.value = "No Geo Location for browser"
        }
    }
    else fetch_temp_fn(loc_val)

}

show_position_fn=function(position){
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    req.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude.toString()
                     + "&lon=" + position.coords.longitude.toString() + "&mode=html&appid="+get_api_key())
  
    req.send();
    req.onreadystatechange = (e) => {
        Cookies.set("weather", req.responseText)
        document.getElementById("tmp_loc").innerHTML = req.responseText
        document.getElementById("location").classList.add("hide")
        document.getElementById("temp").classList.remove("hide")
    }
}

fetch_temp_fn=function(loc_val){
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    req.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + loc_val
                     + "&mode=html&appid="+get_api_key())
    req.send()
    req.onreadystatechange = (e) => {
        Cookies.set("weather", req.responseText)
        document.getElementById("tmp_loc").innerHTML = req.responseText
        document.getElementById("location").classList.add("hide")
        document.getElementById("temp").classList.remove("hide")
    }
}

clear_display_fn=function(){
    document.getElementById("tmp_loc").innerHTML = ""
    document.getElementById("temp").classList.add("hide")
    document.getElementById("location").classList.remove("hide")
}

check_cookie_fn=function(){
    txt = Cookies.get("weather")
    if(txt && txt.length > 0){
        document.getElementById("tmp_loc").innerHTML = txt
        document.getElementById("location").classList.add("hide")
        document.getElementById("temp").classList.remove("hide")
    }else clear_display_fn()

}
