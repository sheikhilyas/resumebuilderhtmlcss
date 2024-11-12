var _a, _b;
// Add event listener to the form
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Input elements
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var experienceElement = document.getElementById("experience");
    var skillsElement = document.getElementById("skills");
    var profilePicElement = document.getElementById("profilePic");
    var usernameElement = document.getElementById("username");
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        var name_1 = nameElement.value;
        var email_1 = emailElement.value;
        var phone_1 = phoneElement.value;
        var education_1 = educationElement.value;
        var experience_1 = experienceElement.value;
        var skills_1 = skillsElement.value;
        var username_1 = usernameElement.value;
        // Profile picture handling
        var profilePicHTML_1 = "";
        var profilePicFile = (_a = profilePicElement === null || profilePicElement === void 0 ? void 0 : profilePicElement.files) === null || _a === void 0 ? void 0 : _a[0];
        if (profilePicFile) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                var imgSrc = reader_1.result;
                profilePicHTML_1 = "<img src=\"".concat(imgSrc, "\" alt=\"Profile Picture\" style=\"max-width: 150px;\">");
                generateResume(profilePicHTML_1, name_1, email_1, phone_1, education_1, experience_1, skills_1, username_1);
            };
            reader_1.readAsDataURL(profilePicFile);
        }
        else {
            // Generate resume without profile picture
            generateResume(profilePicHTML_1, name_1, email_1, phone_1, education_1, experience_1, skills_1, username_1);
        }
    }
    else {
        console.error("One or more input elements are missing");
    }
});
// Function to generate the resume
function generateResume(profilePicHTML, name, email, phone, education, experience, skills, username) {
    var resumeOutputElement = document.getElementById("resumeOutput");
    var resumeOutput = "\n        <h2>Resume</h2>\n        ".concat(profilePicHTML, "\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name, "</span></p>\n        <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n        <h3>Education</h3>\n        <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n        <h3>Work Experience</h3>\n        <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n    ");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        // Create the download link
        var downloadLink = document.createElement('a');
        var uniquePath = "".concat(username.replace(/\s+/g, "_"), "_resume.html");
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your Resume';
        // Add download link to the resume output
        resumeOutputElement.appendChild(document.createElement('br'));
        resumeOutputElement.appendChild(downloadLink);
        // Call the makeEditable function after the resume output is rendered
        makeEditable();
    }
    else {
        console.error("The resume output element is missing");
    }
}
// Function to preview profile picture
(_b = document.getElementById('profilePic')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (event) {
    var _a;
    var fileInput = event.target;
    var previewElement = document.getElementById('profilePicPreview');
    var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file && previewElement) {
        var reader_2 = new FileReader();
        reader_2.onloadend = function () {
            previewElement.src = reader_2.result;
            previewElement.style.display = 'block';
        };
        reader_2.readAsDataURL(file);
    }
});
// Function to make elements editable on click
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || '';
            // Create an input element to replace the text content
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = "text";
                input_1.classList.add("editing-input");
                input_1.value = currentValue;
                currentElement.style.display = "none";
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
                // Event listener for when input loses focus
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = "inline";
                    input_1.remove();
                });
            }
        });
    });
}
