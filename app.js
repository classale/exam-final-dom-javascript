// Initializes the html elements
const form = document.querySelector("#log-form");
const lastMoodName = document.querySelector("#last-mood-name");
const lastMoodImg = document.querySelector("#last-mood-img");
const moodList = document.querySelector("#list-mood");

// Creates the pairs to get the names from the values
const MOD_NAME_PAIRS = {
	"very-happy": "Very Happy",
	"happy": "Happy",
	"neutral": "Neutral",
	"sad": "Sad",
	"very-sad": "Very Sad",
};

// Creates the pairs to get the colors from the values
const MOOD_COLOR_PAIRS = {
	"very-happy": "amber-300",
	"happy": "green-300",
	"neutral": "blue-300",
	"sad": "indigo-200",
	"very-sad": "red-300",
};

// Creates function that initializes the modal that will get added into the body once the "Log your mood" button is pressed
function createMoodModal() {
	// Initializes the modal and its form
	const modal = Object.assign(document.createElement("div"), {
		className: "modal",
	});
	const modalForm = modal.appendChild(
		Object.assign(document.createElement("form"), { className: "log-form" })
	);

	// Adds an event to the form to change the last mood and add the selected mood into the mood list once the form is submitted
	modalForm.addEventListener("submit", (e) => {
		// Prevents the page from reloading
		e.preventDefault();

		// Gets the mood selected in the form and saves it in the mood variable
		const mood = new FormData(modalForm).get("mood");

		// Edits the last mood's text and image
		lastMoodName.innerHTML = MOD_NAME_PAIRS[mood];
		lastMoodImg.src = `./assets/${mood}.svg`;

		// Adds the selected mood into the mood-list
		moodList.appendChild(
			Object.assign(document.createElement("div"), {
				innerHTML: MOD_NAME_PAIRS[mood],
				className: `mood-card ${MOOD_COLOR_PAIRS[mood]} text-preset-4`,
			})
		);

		// Deletes the modal
		modal.remove();
	});

	// Creates the close button
	const closeBtn = modalForm.appendChild(
		Object.assign(document.createElement("button"), {
			className: "btn text",
			type: "button",
			style: "align-self: flex-end;",
		})
	);

	closeBtn.appendChild(
        Object.assign(document.createElement("img"), {
            src: "assets/close.svg",
			alt: "close",
		})
	);

    // Adds an event to the button that makes it delete the modal once clicked
	closeBtn.addEventListener("click", () => modal.remove());

    // Creates the modal's heading text
	modalForm.appendChild(
		Object.assign(document.createElement("h2"), {
			className: "text-preset-2",
			innerHTML: "Log your mood",
		})
	);
	modalForm.appendChild(
		Object.assign(document.createElement("h3"), {
			className: "text-preset-3",
			innerHTML: "How was your mood today?",
		})
	);

	// Creates the labels alongside its input[type="radio"] element. Iterates trough the name pairs object so that we can get both the name and the value using respectively Object.values(MOD_NAME_PAIRS)[i] and Object.keys(MOD_NAME_PAIRS)[i]
	for (let i in Object.entries(MOD_NAME_PAIRS)) {
		const label = modalForm.appendChild(document.createElement("label"));
		label.appendChild(
			Object.assign(document.createElement("input"), {
				type: "radio",
				name: "mood",
				value: Object.keys(MOD_NAME_PAIRS)[i],
			})
		);
		label.appendChild(
			Object.assign(document.createElement("h5"), {
				className: "text-preset-5",
				innerHTML: Object.values(MOD_NAME_PAIRS)[i],
			})
		);
	}

	// Creates the "Log Mood" button
	const submitBtn = modalForm.appendChild(
		Object.assign(document.createElement("button"), {
			className: "btn block blue-600 neutral-o-text",
			type: "submit",
		})
	);
	submitBtn.appendChild(
		Object.assign(document.createElement("h4"), {
			className: "text-preset-4",
			innerHTML: "Log Mood",
		})
	);

	// Returns the modal
	return modal;
}

// Adds an even when the "Log your mood" button is pressed
form.addEventListener("submit", (e) => {
	// Prevents the page from reloading
	e.preventDefault();

	// Adds the modal to the body
	document.body.appendChild(createMoodModal());
});
