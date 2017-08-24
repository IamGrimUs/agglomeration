import $ from "jquery";
import { getAllDepartments } from "./index";

export default class UserCard {
  constructor(user) {
    this.user = user;
  }

  setHandlers(itemToClick) {
    $(itemToClick).on("click", ".profile-card", function(event) {
      event.preventDefault();
      window.location = `profile.html?id=${$(this).attr("data-userId")}`;
    });
  }

  renderUserCard(containerForAppending) {
    $(containerForAppending).prepend(`
      <div data-userId="${this.user
        .id}" class="profile-card ${this.user.departmentName
      .toLowerCase()
      .split(" ", 2)[0] + "-team"}" id="${this.user.id}">
        <div>
          <h2>${this.user.firstName} ${this.user.lastName}</h2>
          <p>${this.user.departmentName}</p>
        </div>
        <figure>
          <img src="img/${this.user.firstName}_${this.user
      .lastName}.jpg" alt="${this.user.firstName} ${this.user.lastName}">
          <figcaption>
            <p>${this.user.position}</p>
            <a href="mailto:${this.user.email}">${this.user.email}</a>
            <a href="tel:${this.user.telephone}">${this.user.telephone}</a>
          </figcaption>
        </figure>
      </div>
    `);
  }

  renderSingleUserProfile(containerForAppending) {
    $(containerForAppending).append(`
      <section class="profile-information">
          <section class="contact-information-layout">
            <div class="flex-container">
              <div>
                <figure class="profile-pic-container ${this.user.departmentName
                  .toLowerCase()
                  .split(" ", 2)[0] + "-team"}">
                  <img src="img/${this.user.firstName}_${this.user
      .lastName}_profile.jpg" alt="${this.user.fullName}" class="profile-pic">
                </figure>
              </div>
              <div>
                <h1 class="text-center">${this.user.firstName} ${this.user
      .lastName}</h1>
                <p class="text-center">${this.user.biography}</p>
              </div>
              <div>
                <p>
                  <span class="profile-category-headline">Email address:</span>
                  <a href="mailto:${this.user.email}" class="email-address">
                  ${this.user.email}
                  </a>
                </p>
                <p>
                  <span class="profile-category-headline">Telephone:</span>
                  <a href="tel:${this.user.telephone}" class="telephone">
                    ${this.user.telephone}
                  </a>
                </p>
                <p>
                  <span class="profile-category-headline">State:</span> ${this
                    .user.state}
                </p>
                <p>
                  <span class="profile-category-headline">Country:</span> ${this
                    .user.country}
                </p>
              </div>
              <div>
                <p>
                  <span class="profile-category-headline">
                    Department:
                  </span> ${this.user.departmentName}
                </p>
                <p>
                  <span class="profile-category-headline">
                    Postition title:
                  </span> ${this.user.position}
                </p>
                <p>
                  <span class="profile-category-headline">Manager:</span> ${this
                    .user.managerName}
                </p>
              </div>
            </div>
            <div class="personal-information">
              <span class="profile-category-headline">
                Favorite part of the day:
              </span>
              <p>
                ${this.user.favoritePartOfDay}
              </p>
            </div>
            <div class="personal-information">
              <span class="profile-category-headline">
                Hobbies:
              </span>
              <p>
                ${this.user.hobbies}
              </p>
            </div>
          </section>
        </section>
    `);
  }

  renderUserProfileEdit(containerForAppending) {
    console.log(containerForAppending);
    $(containerForAppending).append(`
      <header role="banner" class="profile-edit-header">
        <figure class="profile-pic-container ${this.user.departmentName
          .toLowerCase()
          .split(" ", 2)[0] + "-team"}">
          <img src="img/${this.user.firstName}_${this.user
      .lastName}_profile.jpg" alt="${this.user.firstName} ${this.user
      .lastName}" class="profile-pic">
        </figure>
      </header>
      <main role="main">
        <section class="profile-information">
          <form class="profile-edit-form text-left" action="" method="put" id="profile-form">
            <fieldset>
              <section class="flex-container">
                <div>
                  <label for="firstName">First name:</label>
                  <input type="text" id="firstName" name="firstName" value="${this
                    .user.firstName}" aria-describedby="first-name-format"
                    pattern="^[a-zA-Z]*$" title="Firstname">
                  <span id="first-name-format" class="help">Format: Firstname</span>
                </div>
                <div>
                  <label for="lastName">Last name:</label>
                  <input type="text" id="lastName" name="lastName" value="${this
                    .user.lastName}" aria-describedby="last-name-format"
                    pattern="^[a-zA-Z]*$" title="Lastname">
                  <span id="last-name-format" class="help">Format: Lastname</span>
                </div>
                <div>
                  <label for="password">Password:</label>
                  <input type="password" id="password" name="password" value="${this
                    .user.password}" title="password">
                </div>
                <div>
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" value="${this.user
                    .email}" aria-describedby="email-format">
                  <span id="email-format" class="help">Format: jdoe@email.com</span>
                </div>
                <div>
                  <label for="telephone">Telephone:</label>
                  <input type="tel" id="telephone" name="telephone" value="${this
                    .user.telephone}" aria-describedby="telephone-format"
                    title="123-456-7890, +91 123-456-7890">
                  <span id="telephone-format" class="help">Format: 123-456-7890</span>
                </div>
                <div>
                  <label for="position">Position Title:</label>
                  <input type="text" id="position" name="position" value="${this
                    .user.position}">
                </div>
              </section>
              <div>
                <label for="departmentName">Department:</label>
                <select id="departmentName" name="departmentName">
                 ${getAllDepartments()}
                </select>
              </div>
              <section class="flex-container">
                <div>
                  <label for="city">City:</label>
                  <input type="text" id="city" name="city" value="${this.user
                    .city}" aria-describedby="city-format">
                  <span id="city-format" class="help">Format: Cityname</span>
                </div>
                <div>
                  <label for="state">State:</label>
                  <select id="state" name="state">
                    <option value="" disabled="disabled" selected="selected">Please select a State</option>
                    <option value="AK">AK</option>
                    <option value="AL">AL</option>
                    <option value="AR">AR</option>
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DC">DC</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="IA">IA</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="NE">NE</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NV">NV</option>
                    <option value="NY">NY</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VA">VA</option>
                    <option value="VT">VT</option>
                    <option value="WA">WA</option>
                    <option value="WI">WI</option>
                    <option value="WV">WV</option>
                    <option value="WY">WY</option>
                  </select>
                </div>
                <div>
                  <label for="country">Country:</label>
                  <select id="country" name="country">
                    <option value="" disabled="disabled" selected="selected">Please select a Country</option>
                    <option value="AFG">Afghanistan</option>
                    <option value="ALA">Åland Islands</option>
                    <option value="ALB">Albania</option>
                    <option value="DZA">Algeria</option>
                    <option value="ASM">American Samoa</option>
                    <option value="AND">Andorra</option>
                    <option value="AGO">Angola</option>
                    <option value="AIA">Anguilla</option>
                    <option value="ATA">Antarctica</option>
                    <option value="ATG">Antigua and Barbuda</option>
                    <option value="ARG">Argentina</option>
                    <option value="ARM">Armenia</option>
                    <option value="ABW">Aruba</option>
                    <option value="AUS">Australia</option>
                    <option value="AUT">Austria</option>
                    <option value="AZE">Azerbaijan</option>
                    <option value="BHS">Bahamas</option>
                    <option value="BHR">Bahrain</option>
                    <option value="BGD">Bangladesh</option>
                    <option value="BRB">Barbados</option>
                    <option value="BLR">Belarus</option>
                    <option value="BEL">Belgium</option>
                    <option value="BLZ">Belize</option>
                    <option value="BEN">Benin</option>
                    <option value="BMU">Bermuda</option>
                    <option value="BTN">Bhutan</option>
                    <option value="BOL">Bolivia, Plurinational State of</option>
                    <option value="BES">Bonaire, Sint Eustatius and Saba</option>
                    <option value="BIH">Bosnia and Herzegovina</option>
                    <option value="BWA">Botswana</option>
                    <option value="BVT">Bouvet Island</option>
                    <option value="BRA">Brazil</option>
                    <option value="IOT">British Indian Ocean Territory</option>
                    <option value="BRN">Brunei Darussalam</option>
                    <option value="BGR">Bulgaria</option>
                    <option value="BFA">Burkina Faso</option>
                    <option value="BDI">Burundi</option>
                    <option value="KHM">Cambodia</option>
                    <option value="CMR">Cameroon</option>
                    <option value="CAN">Canada</option>
                    <option value="CPV">Cape Verde</option>
                    <option value="CYM">Cayman Islands</option>
                    <option value="CAF">Central African Republic</option>
                    <option value="TCD">Chad</option>
                    <option value="CHL">Chile</option>
                    <option value="CHN">China</option>
                    <option value="CXR">Christmas Island</option>
                    <option value="CCK">Cocos (Keeling) Islands</option>
                    <option value="COL">Colombia</option>
                    <option value="COM">Comoros</option>
                    <option value="COG">Congo</option>
                    <option value="COD">Congo, the Democratic Republic of the</option>
                    <option value="COK">Cook Islands</option>
                    <option value="CRI">Costa Rica</option>
                    <option value="CIV">Côte d'Ivoire</option>
                    <option value="HRV">Croatia</option>
                    <option value="CUB">Cuba</option>
                    <option value="CUW">Curaçao</option>
                    <option value="CYP">Cyprus</option>
                    <option value="CZE">Czech Republic</option>
                    <option value="DNK">Denmark</option>
                    <option value="DJI">Djibouti</option>
                    <option value="DMA">Dominica</option>
                    <option value="DOM">Dominican Republic</option>
                    <option value="ECU">Ecuador</option>
                    <option value="EGY">Egypt</option>
                    <option value="SLV">El Salvador</option>
                    <option value="GNQ">Equatorial Guinea</option>
                    <option value="ERI">Eritrea</option>
                    <option value="EST">Estonia</option>
                    <option value="ETH">Ethiopia</option>
                    <option value="FLK">Falkland Islands (Malvinas)</option>
                    <option value="FRO">Faroe Islands</option>
                    <option value="FJI">Fiji</option>
                    <option value="FIN">Finland</option>
                    <option value="FRA">France</option>
                    <option value="GUF">French Guiana</option>
                    <option value="PYF">French Polynesia</option>
                    <option value="ATF">French Southern Territories</option>
                    <option value="GAB">Gabon</option>
                    <option value="GMB">Gambia</option>
                    <option value="GEO">Georgia</option>
                    <option value="DEU">Germany</option>
                    <option value="GHA">Ghana</option>
                    <option value="GIB">Gibraltar</option>
                    <option value="GRC">Greece</option>
                    <option value="GRL">Greenland</option>
                    <option value="GRD">Grenada</option>
                    <option value="GLP">Guadeloupe</option>
                    <option value="GUM">Guam</option>
                    <option value="GTM">Guatemala</option>
                    <option value="GGY">Guernsey</option>
                    <option value="GIN">Guinea</option>
                    <option value="GNB">Guinea-Bissau</option>
                    <option value="GUY">Guyana</option>
                    <option value="HTI">Haiti</option>
                    <option value="HMD">Heard Island and McDonald Islands</option>
                    <option value="VAT">Holy See (Vatican City State)</option>
                    <option value="HND">Honduras</option>
                    <option value="HKG">Hong Kong</option>
                    <option value="HUN">Hungary</option>
                    <option value="ISL">Iceland</option>
                    <option value="IND">India</option>
                    <option value="IDN">Indonesia</option>
                    <option value="IRN">Iran, Islamic Republic of</option>
                    <option value="IRQ">Iraq</option>
                    <option value="IRL">Ireland</option>
                    <option value="IMN">Isle of Man</option>
                    <option value="ISR">Israel</option>
                    <option value="ITA">Italy</option>
                    <option value="JAM">Jamaica</option>
                    <option value="JPN">Japan</option>
                    <option value="JEY">Jersey</option>
                    <option value="JOR">Jordan</option>
                    <option value="KAZ">Kazakhstan</option>
                    <option value="KEN">Kenya</option>
                    <option value="KIR">Kiribati</option>
                    <option value="PRK">Korea, Democratic People's Republic of</option>
                    <option value="KOR">Korea, Republic of</option>
                    <option value="KWT">Kuwait</option>
                    <option value="KGZ">Kyrgyzstan</option>
                    <option value="LAO">Lao People's Democratic Republic</option>
                    <option value="LVA">Latvia</option>
                    <option value="LBN">Lebanon</option>
                    <option value="LSO">Lesotho</option>
                    <option value="LBR">Liberia</option>
                    <option value="LBY">Libya</option>
                    <option value="LIE">Liechtenstein</option>
                    <option value="LTU">Lithuania</option>
                    <option value="LUX">Luxembourg</option>
                    <option value="MAC">Macao</option>
                    <option value="MKD">Macedonia, the former Yugoslav Republic of</option>
                    <option value="MDG">Madagascar</option>
                    <option value="MWI">Malawi</option>
                    <option value="MYS">Malaysia</option>
                    <option value="MDV">Maldives</option>
                    <option value="MLI">Mali</option>
                    <option value="MLT">Malta</option>
                    <option value="MHL">Marshall Islands</option>
                    <option value="MTQ">Martinique</option>
                    <option value="MRT">Mauritania</option>
                    <option value="MUS">Mauritius</option>
                    <option value="MYT">Mayotte</option>
                    <option value="MEX">Mexico</option>
                    <option value="FSM">Micronesia, Federated States of</option>
                    <option value="MDA">Moldova, Republic of</option>
                    <option value="MCO">Monaco</option>
                    <option value="MNG">Mongolia</option>
                    <option value="MNE">Montenegro</option>
                    <option value="MSR">Montserrat</option>
                    <option value="MAR">Morocco</option>
                    <option value="MOZ">Mozambique</option>
                    <option value="MMR">Myanmar</option>
                    <option value="NAM">Namibia</option>
                    <option value="NRU">Nauru</option>
                    <option value="NPL">Nepal</option>
                    <option value="NLD">Netherlands</option>
                    <option value="NCL">New Caledonia</option>
                    <option value="NZL">New Zealand</option>
                    <option value="NIC">Nicaragua</option>
                    <option value="NER">Niger</option>
                    <option value="NGA">Nigeria</option>
                    <option value="NIU">Niue</option>
                    <option value="NFK">Norfolk Island</option>
                    <option value="MNP">Northern Mariana Islands</option>
                    <option value="NOR">Norway</option>
                    <option value="OMN">Oman</option>
                    <option value="PAK">Pakistan</option>
                    <option value="PLW">Palau</option>
                    <option value="PSE">Palestinian Territory, Occupied</option>
                    <option value="PAN">Panama</option>
                    <option value="PNG">Papua New Guinea</option>
                    <option value="PRY">Paraguay</option>
                    <option value="PER">Peru</option>
                    <option value="PHL">Philippines</option>
                    <option value="PCN">Pitcairn</option>
                    <option value="POL">Poland</option>
                    <option value="PRT">Portugal</option>
                    <option value="PRI">Puerto Rico</option>
                    <option value="QAT">Qatar</option>
                    <option value="REU">Réunion</option>
                    <option value="ROU">Romania</option>
                    <option value="RUS">Russian Federation</option>
                    <option value="RWA">Rwanda</option>
                    <option value="BLM">Saint Barthélemy</option>
                    <option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
                    <option value="KNA">Saint Kitts and Nevis</option>
                    <option value="LCA">Saint Lucia</option>
                    <option value="MAF">Saint Martin (French part)</option>
                    <option value="SPM">Saint Pierre and Miquelon</option>
                    <option value="VCT">Saint Vincent and the Grenadines</option>
                    <option value="WSM">Samoa</option>
                    <option value="SMR">San Marino</option>
                    <option value="STP">Sao Tome and Principe</option>
                    <option value="SAU">Saudi Arabia</option>
                    <option value="SEN">Senegal</option>
                    <option value="SRB">Serbia</option>
                    <option value="SYC">Seychelles</option>
                    <option value="SLE">Sierra Leone</option>
                    <option value="SGP">Singapore</option>
                    <option value="SXM">Sint Maarten (Dutch part)</option>
                    <option value="SVK">Slovakia</option>
                    <option value="SVN">Slovenia</option>
                    <option value="SLB">Solomon Islands</option>
                    <option value="SOM">Somalia</option>
                    <option value="ZAF">South Africa</option>
                    <option value="SGS">South Georgia and the South Sandwich Islands</option>
                    <option value="SSD">South Sudan</option>
                    <option value="ESP">Spain</option>
                    <option value="LKA">Sri Lanka</option>
                    <option value="SDN">Sudan</option>
                    <option value="SUR">Suriname</option>
                    <option value="SJM">Svalbard and Jan Mayen</option>
                    <option value="SWZ">Swaziland</option>
                    <option value="SWE">Sweden</option>
                    <option value="CHE">Switzerland</option>
                    <option value="SYR">Syrian Arab Republic</option>
                    <option value="TWN">Taiwan, Province of China</option>
                    <option value="TJK">Tajikistan</option>
                    <option value="TZA">Tanzania, United Republic of</option>
                    <option value="THA">Thailand</option>
                    <option value="TLS">Timor-Leste</option>
                    <option value="TGO">Togo</option>
                    <option value="TKL">Tokelau</option>
                    <option value="TON">Tonga</option>
                    <option value="TTO">Trinidad and Tobago</option>
                    <option value="TUN">Tunisia</option>
                    <option value="TUR">Turkey</option>
                    <option value="TKM">Turkmenistan</option>
                    <option value="TCA">Turks and Caicos Islands</option>
                    <option value="TUV">Tuvalu</option>
                    <option value="UGA">Uganda</option>
                    <option value="UKR">Ukraine</option>
                    <option value="ARE">United Arab Emirates</option>
                    <option value="GBR">United Kingdom</option>
                    <option value="USA">United States</option>
                    <option value="UMI">United States Minor Outlying Islands</option>
                    <option value="URY">Uruguay</option>
                    <option value="UZB">Uzbekistan</option>
                    <option value="VUT">Vanuatu</option>
                    <option value="VEN">Venezuela, Bolivarian Republic of</option>
                    <option value="VNM">Viet Nam</option>
                    <option value="VGB">Virgin Islands, British</option>
                    <option value="VIR">Virgin Islands, U.S.</option>
                    <option value="WLF">Wallis and Futuna</option>
                    <option value="ESH">Western Sahara</option>
                    <option value="YEM">Yemen</option>
                    <option value="ZMB">Zambia</option>
                    <option value="ZWE">Zimbabwe</option>
                  </select>
                </div>
              </section>
              <div>
                <label for="biography">Introduce yourself:</label>
                <textarea id="biography" name="biography" value="${this.user
                  .biography}" rows="5" cols="20" placeholder="${this.user
      .biography}"></textarea>
              </div>
              <div>
                <label for="favoritePartOfDay">Favorite part of the day:</label>
                <textarea id="favoritePartOfDay" name="favoritePartOfDay" value="${this
                  .user
                  .favoritePartOfDay}" rows="5" cols="20" placeholder="${this
      .user.favoritePartOfDay}"></textarea>
              </div>
              <div>
                <label for="hobbies">Hobbies:</label>
                <textarea id="hobbies" name="hobbies" value="${this.user
                  .hobbies}" rows="5" cols="20" placeholder="${this.user
      .hobbies}"></textarea>
              </div>
              <div>
                <button name="profile-edit-submit" type="submit" value="" id="profile-edit-submit" class="profile-submit">Submit</button>
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    `);
  }

  renderUserLink(containerForAppending) {
    $(containerForAppending).append(`
      <a href="profile-edit.html?id=${this.user.id}">
        <i class="fa fa-user fa-2x" aria-hidden="true" ></i>
        edit ${this.user.firstName}'s profile
      </a>
    `);
  }
}
