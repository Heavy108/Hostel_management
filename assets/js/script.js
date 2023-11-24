document.addEventListener("DOMContentLoaded", function () {
  // Load the header content
  var headerContainer = document.getElementById("header");
  var headerRequest = new XMLHttpRequest();
  headerRequest.open("GET", "header.html", true);
  headerRequest.onreadystatechange = function () {
    if (headerRequest.readyState === 4 && headerRequest.status === 200) {
      headerContainer.innerHTML = headerRequest.responseText;
    }
  };
  headerRequest.send();

  // Load the footer content
  var footerContainer = document.getElementById("Hometab");
  var footerRequest = new XMLHttpRequest();
  footerRequest.open("GET", "Hometab.html", true);
  footerRequest.onreadystatechange = function () {
    if (footerRequest.readyState === 4 && footerRequest.status === 200) {
      footerContainer.innerHTML = footerRequest.responseText;
    }
  };
  footerRequest.send();
});
