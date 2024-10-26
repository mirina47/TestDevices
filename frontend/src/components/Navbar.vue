<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #7AB2FF;">
        <div class="container-fluid p-2">
          <ul class="navbar-nav me-auto mb-8 mb-lg-0 h5 nav-centered">
            <li class="nav-item"><router-link class="nav-link text" to="/listDevices">Устройства</router-link></li> 
          </ul>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
      export default {
        name: "NavBar",
        data() {
          return {};
  
        }
  };
  </script>
  
  <style>
  
  a.text:active {color: #000000} /* активная/посещенная ссылка */
  a.text:visited {color: #000000}
  a.text:hover {color: #ffffff}  /* при наведении */
  
  a.text {
    text-decoration: none;
    color: #000000;
  }
  
  a.login:active {color: #ffffff} /* активная/посещенная ссылка */
  a.login:hover {color: #e1e1e1}  /* при наведении */
  a.login {
    text-decoration: none;
    color: #ffffff;
  }
  
  a.logout:active {color: #000000} /* активная/посещенная ссылка */
  a.logout:hover {color: #bb1d1d}  /* при наведении */
  a.logout {
    text-decoration: none;
    color: #000000;
  }
  
  .navbar {
    text-align: center;
    margin-top: -20px;
    margin-bottom: 20px;
  }
  
  .navbar-nav > li{
    padding-left:20px;
    padding-right:20px;
    font-weight: 600;
  }
  
  .nav-centered {
    width: 100%;
    justify-content: center;
  }
  
  .nav-a {
    margin: 5px;
  }
  
  .navbar ul{
    flex-wrap: wrap;
  }
  
  </style>