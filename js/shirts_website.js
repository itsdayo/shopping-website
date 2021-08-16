function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const register = () => {
  // get all the elements in the dom
  const screenName = document.getElementById("screenName");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  if (
    screenName.value === "" ||
    username.value === "" ||
    password.value === ""
  ) {
    document.getElementById("errorMessage").innerHTML = `
    <span style="color:red; margin-left:200px"> Please enter a response to every field</span>`;
  } else {
    document.getElementById("errorMessage").innerHTML = `
    <span style=""> </span>`;
    localStorage.setItem("screenName", screenName.value);
    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);

    sessionStorage.setItem("sessionKey", uuidv4());
    window.location.href = "./profile.html";
  }
};

const login = () => {
  // get all the elements in the dom

  const username = document.getElementById("username");
  const password = document.getElementById("password");

  if (username.value === "" || password.value === "") {
    document.getElementById("errorMessage").innerHTML = `
    <span style="color:red; margin-left:200px"> Please enter a response to every field</span>`;
  } else {
    document.getElementById("errorMessage").innerHTML = `
    <span style=""> </span>`;

    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);

    sessionStorage.setItem("sessionKey", uuidv4());
    window.location.href = "./profile.html";
  }
};

const profileChange = () => {
  const formBox = document.getElementById("formBox");
  const formButton = document.getElementById("formButton");
  const backgroundColor = document.getElementById("backgroundColor");
  const buttonColors = document.getElementById("buttonColors");
  formBox.style.backgroundColor = backgroundColor.value;
  formButton.style.backgroundColor = buttonColors.value;

  localStorage.setItem("formColor", backgroundColor.value);
  localStorage.setItem("buttonColor", buttonColors.value);
};

const displayProducts = (products) => {
  console.log(products);

  let shirtsObj = [];
  let shirtsArray = [];

  let shortSleeveShirtsMen = products.Men.filter((shirt) => {
    if (shirt.sleeve == "short") {
      return shirt;
    }
  });
  let longSleeveShirtsMen = products.Men.filter((shirt) => {
    if (shirt.sleeve == "long") {
      return shirt;
    }
  });
  let shortSleeveShirtWomen = products.Women.filter((shirt) => {
    if (shirt.sleeve == "short") {
      return shirt;
    }
  });
  let longSleeveShirtsWomen = products.Women.filter((shirt) => {
    if (shirt.sleeve == "long") {
      return shirt;
    }
  });

  shirtsObj.men = shortSleeveShirtsMen.concat(longSleeveShirtsMen);
  shirtsObj.women = shortSleeveShirtWomen.concat(longSleeveShirtsWomen);

  const displayShortShirts = (key) => {
    return shirtsObj[`${key}`]
      .map((shirtItem) => {
        if (shirtItem.sleeve == "short") {
          return `
      <div class="singleShirt">    
      <div>Sleeve: ${shirtItem.sleeve} </div>
       <div>Size: ${shirtItem.size} </div>
        </div>
       `;
          //     `<div>Sleeve: ${menShirt.sleeve} </div>
          // <div>Sleeve: ${menShirt.size} </div>

          // `;
        }
      })
      .join("");
  };

  const displayLongShirts = (key) => {
    return shirtsObj[`${key}`]
      .map((shirtItem) => {
        if (shirtItem.sleeve == "long") {
          return `
      <div class="singleShirt">    
      <div>Sleeve: ${shirtItem.sleeve} </div>
       <div>Size: ${shirtItem.size} </div>
        </div>
       `;
          //     `<div>Sleeve: ${menShirt.sleeve} </div>
          // <div>Sleeve: ${menShirt.size} </div>

          // `;
        }
      })
      .join("");
  };

  const shortShirtsHTML = Object.keys(shirtsObj)
    .map((key) => {
      return `<h3 id ="colorSelectorLabel" for="menShirts">${key}</h3>
    <div class="shirtsInDisplay" >
    ${displayShortShirts(key)}

    </div>
    `;
    })
    .join("");

  const longShirtsHTML = Object.keys(shirtsObj)
    .map((key) => {
      return `<h3 id ="colorSelectorLabel" for="menShirts">${key}</h3>
    <div class="shirtsInDisplay" >
    ${displayLongShirts(key)}

    </div>
    `;
    })
    .join("");
  // <label id ="colorSelectorLabel" for="colorChoices">Set Your Background Color:</label><!-- drop down list of color options -->
  //        <select id="colorChoice">
  //           <option value="white">Default White</option>
  //         <option value="red">Red</option>
  //           <option value="yellow">Yellow</option>
  //           <option value="green">Green</option>
  //           <option value="blue">Blue</option>
  // 		<option value="black">Black</option>
  // 		<option value="gray">Gray</option>
  //        </select>
  document.getElementById("shortSleeve").innerHTML = `
  ${shortShirtsHTML}`;

  document.getElementById("longSleeve").innerHTML = `
  ${longShirtsHTML}`;
};
