//XMLHttpRequest object creation
function loadTable(Car_Name = "") {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Cars?Car_Name_like=${Car_Name}`);
  xhttp.send();
  //load table
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText); // >>js objects

      for (let object of objects) {
        trHTML += '<div class=" card text-dark col-3 mt-5">';
        trHTML +=
          '<a href="#"><img src="' +
          object["Image"] +
          '" class="card-img-top avatar" onclick="changeimage(' +
          object["id"] +
          ')" height="160vh"></a>';
        trHTML += '<a href="#" class="text-decoration-none link-dark" onclick="editcarname('+objects["id"]+')"><h5 class="card-title">' + object["Car_Name"] + "</h5></a>";
        trHTML += '<p class="card-subtitle ">' + object["Car_Type"] + "</p>";
        trHTML +=
          '<a href="#" class="card-text link-dark text-decoration-none">' +
          "Price: " +
          object["Price"] +
          "</a>";
        // trHTML +=
        //     '<button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
        //     object["id"] +
        //     ')"><i class="fa-solid fa-pen-to-square text-dark " style="color: #ffffff;"></i></button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')"><i class="fa-regular fa-trash-can text-dark style="color: #ffffff;"></i></button>';
        trHTML += "</div>";
      }
      document.getElementById("card_details_1").innerHTML = trHTML;
    }
  };
}
loadTable();

// function searchLocation(Location = '') {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", `http://localhost:3000/Cars?Location_like=${Location}`);
//   xhttp.send();

//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       const objects = JSON.parse(this.responseText); // >>js objects
//       for (let object of objects) {
//         if (object.Location.toLowerCase().includes(Location.toLowerCase())) {
//           loadTable();
//         }
//       }
//     }
//   };
// }
//search function
function search() {
  const Car_Name = document.getElementById("searchbar").value;
  loadTable(Car_Name);
}
//search location
function searchPlace() {
  const Car_Location = document.getElementById("searchlocation").value;
  searchLocation(Car_Location);
}
//Sweet alert box for adding Cars [CREATE]
function showUserCreateBox() {
  Swal.fire({
    title: "Add New Cars",
    showCloseButton: true,
    html:
      '<input id="id" type="hidden">' +
      '<input id="Car_Name" class="swal2-input" placeholder="Car_Name">' +
      '<input id="Car_Type" class="swal2-input" placeholder="Car_Description" >' +
      '<input id="Price" class="swal2-input" placeholder="Price">' +
      '<input id="Location" class="swal2-input" placeholder="Location">' +
      '<input id="Image" class="form-control swa4l1-input mt-4" type="file">',
    preConfirm: () => {
      userCreate();
    },
  });
}

function userCreate() {
  const pname = document.getElementById("Car_Name").value;
  const ptype = document.getElementById("Car_Type").value;
  const price = document.getElementById("Price").value;
  const plocation = document.getElementById("Location").value;
  const image = document.getElementById("Image");
  const file = "assets/images/" + image.files[0].name;

  if (validation() == true) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/Cars/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        // >>json string
        Car_Name: pname,
        Car_Type: ptype,
        Price: price,
        Location: plocation,
        Image: file,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        loadTable();
      }
    };
  }
}
//CHANGE IMAGE FUNCTION
function changeimage(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Cars/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText); // >>js objects
      Swal.fire({
        title: "CHANGE CAR IMAGE",
        showCloseButton: true,
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="Car_Name" class="swal2-input" placeholder="name" value="' +
          objects["Car_Name"] +
          '">' +
          '<input id="Car_Type" class="swal2-input" type="hidden"  placeholder="Car_Description" value="'+objects["Car_Type"]+'" >' +
          '<input id="Price" class="swal2-input"  type="hidden" placeholder="price" value="' +
          objects["Price"] +
          '">' +
          '<input id="Image" type="file" class="form-control swa4l1-input mt-4" placeholder="image" value="' +
          objects["Image"] +
          '">',
        preConfirm: () => {
          userEdit(id);
        },
      });
    }
  };
}
//EDIT CAR NAME
function editcarname(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Cars/`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText); // >>js objects
      Swal.fire({
        title: "EDIT CAR NAME",
        showCloseButton: true,
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="Car_Name" class="swal2-input" placeholder="name" value="' +
          objects["Car_Name"] +
          '">' +
          '<input id="Car_Type" class="swal2-input" type="hidden"  placeholder="Car_Description" value="'+objects["Car_Type"]+'" >' +
          '<input id="Price" class="swal2-input"  type="hidden" placeholder="price" value="' +
          objects["Price"] +
          '">' +
          '<input id="Image" type="hidden" class="form-control swa4l1-input mt-4" placeholder="image" value="' +
          objects["Image"] +
          '">',
        preConfirm: () => {
          editname(id);
        },
      });
    }
  };
}

//edit car name
function editname(id) {
  const pname = document.getElementById("Car_Name").value;
  const ptype = document.getElementById("Car_Type").value;
  const price = document.getElementById("Price").value;
  

  if (validation2() == true) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/Cars/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      Car_Name: pname,
      Car_Type: ptype,
      Price: price,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      loadTable();
    }
  };
   }
}
/////////////////////
function userEdit(id) {
  const pname = document.getElementById("Car_Name").value;
  const ptype = document.getElementById("Car_Type").value;
  const price = document.getElementById("Price").value;
  const image = document.getElementById("Image");
  const file = "assets/images/" + image.files[0].name;

  if (validation2() == true) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/Cars/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      Car_Name: pname,
      Car_Type: ptype,
      Price: price,
      Image: file,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      loadTable();
    }
  };
   }
}
function userDelete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3000/Cars/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  Swal.fire({
    title: "Are you sure?",
    text: "Product will get deleted permanently!",
    icon: "warning",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "grey",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      xhttp.send(
        JSON.stringify({
          id: id,
        })
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          Swal.fire({
            title: "Deleted successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          loadTable();
        }
      };
    }
  });
}
function validation2() {
  const pname = document.getElementById("Car_Name").value;
  const ptype = document.getElementById("Car_Type").value;
  const price = document.getElementById("Price").value;
  const file = document.getElementById("Image").value;
  //regex
  const pnameCheck = /^[a-zA-Z\d\s]{2,20}$/;
  const ptypeCheck = /^[a-zA-Z\d\s]{2,20}$/;

  if (pname == "" || ptype == "" || price == "" || file == "") {
    Swal.fire({
      title: "Fields should not be left empty",
      showConfirmButton: true,
      icon: "error",
    });
    return false;
  }

  if (!pname.match(pnameCheck)) {
    Swal.fire({
      title: "Invalid Input",
      text: "Product Name can be letter or number",
      icon: "error",
      showConfirmButton: true,
    });
    return false;
  }

  if (!ptype.match(ptypeCheck)) {
    Swal.fire({
      title: "Invalid Input",
      text: "Product Type can be letter or number",
      icon: "error",
      showConfirmButton: true,
    });
    return false;
  }

  if (pname.match(pnameCheck) && ptype.match(ptypeCheck)) {
    Swal.fire({
      title: "Successfully edited",
      icon: "success",
      showConfirmButton: true,
    });
    return true;
  }
}
function validation() {
  const pname = document.getElementById("Car_Name").value;
  const ptype = document.getElementById("Car_Type").value;
  const price = document.getElementById("Price").value;
  const file = document.getElementById("Image").value;
  //regex
  const pnameCheck = /^[a-zA-Z\d\s]{2,20}$/;
  const ptypeCheck = /^[a-zA-Z\d\s]{2,20}$/;
  const pqtyCheck = /^[a-zA-Z\d\s]{1,20}$/;

  if (pname == "" || ptype == "" || price == "" || file == "") {
    Swal.fire({
      title: "Fields should not be left empty",
      showConfirmButton: true,
      icon: "error",
    });
    return false;
  }

  if (!pname.match(pnameCheck)) {
    Swal.fire({
      title: "Invalid Input",
      text: "Product Name can be letter or number",
      icon: "error",
      showConfirmButton: true,
    });
    return false;
  }

  if (!ptype.match(ptypeCheck)) {
    Swal.fire({
      title: "Invalid Input",
      text: "Product Type can be letter or number",
      icon: "error",
      showConfirmButton: true,
    });
    return false;
  }

  if (pname.match(pnameCheck) && ptype.match(ptypeCheck)) {
    Swal.fire({
      title: "Successfully Created",
      icon: "success",
      showConfirmButton: true,
    });
    return true;
  }
}

