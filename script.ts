// Add event listener to the form
document.getElementById('resumeForm')?.addEventListener('submit', function(event: Event) {
    event.preventDefault();

    // Input elements
    const nameElement = document.getElementById("name") as HTMLInputElement | null;
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const phoneElement = document.getElementById("phone") as HTMLInputElement | null;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement | null;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement | null;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement | null;
    const profilePicElement = document.getElementById("profilePic") as HTMLInputElement | null;
    const usernameElement = document.getElementById("username") as HTMLInputElement | null;

    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        const name: string = nameElement.value;
        const email: string = emailElement.value;
        const phone: string = phoneElement.value;
        const education: string = educationElement.value;
        const experience: string = experienceElement.value;
        const skills: string = skillsElement.value;
        const username: string = usernameElement.value;

        // Profile picture handling
        let profilePicHTML = "";
        const profilePicFile = profilePicElement?.files?.[0];
        if (profilePicFile) {
            const reader = new FileReader();
            reader.onloadend = function () {
                const imgSrc = reader.result as string;
                profilePicHTML = `<img src="${imgSrc}" alt="Profile Picture" style="max-width: 150px;">`;

                generateResume(profilePicHTML, name, email, phone, education, experience, skills, username);
            };
            reader.readAsDataURL(profilePicFile);
        } else {
            // Generate resume without profile picture
            generateResume(profilePicHTML, name, email, phone, education, experience, skills, username);
        }
    } else {
        console.error("One or more input elements are missing");
    }
});

// Function to generate the resume
function generateResume(profilePicHTML: string, name: string, email: string, phone: string, education: string, experience: string, skills: string, username: string) {
    const resumeOutputElement = document.getElementById("resumeOutput") as HTMLElement | null;
    const resumeOutput = `
        <h2>Resume</h2>
        ${profilePicHTML}
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>
        <h3>Work Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>
        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
    `;

    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;

        // Create the download link
        const downloadLink = document.createElement('a');
        const uniquePath = `${username.replace(/\s+/g, "_")}_resume.html`;
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your Resume';

        // Add download link to the resume output
        resumeOutputElement.appendChild(document.createElement('br'));
        resumeOutputElement.appendChild(downloadLink);

        // Call the makeEditable function after the resume output is rendered
        makeEditable();
    } else {
        console.error("The resume output element is missing");
    }
}

// Function to preview profile picture
document.getElementById('profilePic')?.addEventListener('change', function(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const previewElement = document.getElementById('profilePicPreview') as HTMLImageElement | null;
    const file = fileInput.files?.[0];
    if (file && previewElement) {
        const reader = new FileReader();
        reader.onloadend = function () {
            previewElement.src = reader.result as string;
            previewElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Function to make elements editable on click
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || '';

            // Create an input element to replace the text content
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = "text";
                input.classList.add("editing-input");
                input.value = currentValue;

                currentElement.style.display = "none";
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();

                // Event listener for when input loses focus
                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = "inline";
                    input.remove();
                });
            }
        });
    });
}
