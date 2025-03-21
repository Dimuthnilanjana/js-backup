// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelectorAll(".select-wrapper").forEach((wrapper) => {
//       const originalSelect = wrapper.querySelector("select");
//       const selectButton = wrapper.querySelector(".form-select.text-start");
//       const dropdown = wrapper.querySelector(".custom-select-dropdown");
//       const optionsContainer = wrapper.querySelector(".select-options");
//       const selectAllCheckbox = wrapper.querySelector(".form-check-input");
  
//       // Function to truncate text
//       function truncateText(text, length = 24) {
//         return text.length > length ? text.substring(0, length) + "..." : text;
//       }
  
//       // Create checkbox options dynamically
//       originalSelect.querySelectorAll("option").forEach((option) => {
//         const div = document.createElement("div");
//         div.className = "select-option";
  
//         const truncatedText = truncateText(option.textContent);
  
//         div.innerHTML = `
//           <input class="form-check-input option-checkbox" type="checkbox" value="${option.value}">
//           <label class="form-check-label" title="${option.textContent}">${truncatedText}</label>
//         `;
//         optionsContainer.appendChild(div);
//       });
  
//       // Function to toggle dropdown
//       selectButton.addEventListener("click", (e) => {
//         dropdown.classList.toggle("show");
//         e.stopPropagation();
//       });
  
//       // Close dropdown when clicking outside
//       document.addEventListener("click", (e) => {
//         if (!dropdown.contains(e.target) && e.target !== selectButton) {
//           dropdown.classList.remove("show");
//         }
//       });
  
//       // Select all functionality
//       selectAllCheckbox.addEventListener("change", () => {
//         const isChecked = selectAllCheckbox.checked;
//         wrapper.querySelectorAll(".option-checkbox").forEach((checkbox) => {
//           checkbox.checked = isChecked;
//         });
//         updateSelectedDisplay();
//         updateOriginalSelect();
//       });
  
//       // Add event listeners to checkboxes
//       const checkboxes = wrapper.querySelectorAll(".option-checkbox");
//       checkboxes.forEach((checkbox) => {
//         checkbox.addEventListener("change", () => {
//           updateSelectAllCheckbox();
//           updateSelectedDisplay();
//           updateOriginalSelect();
//         });
//       });
  
//       // Prevent dropdown from closing when clicking inside
//       dropdown.addEventListener("click", (e) => {
//         e.stopPropagation();
//       });
  
//       // Update "Select All" checkbox state
//       function updateSelectAllCheckbox() {
//         const totalCheckboxes = checkboxes.length;
//         const checkedCheckboxes = Array.from(checkboxes).filter((cb) => cb.checked).length;
//         selectAllCheckbox.checked = totalCheckboxes === checkedCheckboxes;
//       }
  
//       // Update button display with selected items as chips
//       function updateSelectedDisplay() {
//         const selectedCheckboxes = Array.from(wrapper.querySelectorAll(".option-checkbox:checked"));
//         const count = selectedCheckboxes.length;
  
//         // Clear previous content inside the button
//         selectButton.innerHTML = "";
  
//         if (count === 0) {
//           selectButton.innerHTML = `Select Options`;
//         } else {
//           // Show only first 3 chips, then add a "+X" if there are more
//           const maxVisibleChips = 3;
//           let chipsDisplayed = 0;
  
//           selectedCheckboxes.forEach((checkbox, index) => {
//             if (index < maxVisibleChips) {
//               const chip = document.createElement("span");
//               chip.className = "chip";
//               const fullText = checkbox.nextElementSibling.title; // Get full text
//               const truncatedText = truncateText(fullText);
              
//               // Set the chip's text and title (for hover effect)
//               chip.textContent = truncatedText;
//               chip.title = fullText; // Enables hover tooltip
  
//               // Add a remove icon (X) inside the chip
//               const removeIcon = document.createElement("span");
//               removeIcon.className = "remove-chip";
//               removeIcon.textContent = " ×"; // Space for styling
//               removeIcon.dataset.value = checkbox.value;
  
//               // Append remove functionality
//               removeIcon.addEventListener("click", (e) => {
//                 e.stopPropagation(); // Prevent dropdown from opening
//                 checkbox.checked = false;
//                 updateSelectAllCheckbox();
//                 updateSelectedDisplay();
//                 updateOriginalSelect();
//               });
  
//               chip.appendChild(removeIcon);
//               selectButton.appendChild(chip);
  
//               chipsDisplayed++;
//             }
//           });
  
//           // Add a "+X" counter if more than 3 options are selected
//           if (count > maxVisibleChips) {
//             const moreChip = document.createElement("span");
//             moreChip.className = "chip more-chip";
//             moreChip.textContent = `+${count - maxVisibleChips}`;
//             selectButton.appendChild(moreChip);
//           }
//         }
//       }
  
//       // Update original select field
//       function updateOriginalSelect() {
//         checkboxes.forEach((checkbox) => {
//           const option = originalSelect.querySelector(`option[value="${checkbox.value}"]`);
//           option.selected = checkbox.checked;
//         });
//       }
//     });
//   });


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".select-wrapper").forEach((wrapper) => {
    const originalSelect = wrapper.querySelector("select");
    const selectButton = wrapper.querySelector(".form-select.text-start");
    const dropdown = wrapper.querySelector(".custom-select-dropdown");
    const optionsContainer = wrapper.querySelector(".select-options");
    const selectAllCheckbox = wrapper.querySelector(".form-check-input");

    // Create and insert a "Clear Selection" button
    const clearSelectionButton = document.createElement("button");
    clearSelectionButton.textContent = "Clear Selection";
    clearSelectionButton.className = "btn btn-danger clear-selection";
    clearSelectionButton.style.display = "none"; // Initially hidden
    clearSelectionButton.addEventListener("click", () => {
      clearSelections();
    });

    wrapper.appendChild(clearSelectionButton); // Add button below the dropdown

    // Function to truncate text
    function truncateText(text, length = 24) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    }

    // Create checkbox options dynamically
    originalSelect.querySelectorAll("option").forEach((option) => {
      const div = document.createElement("div");
      div.className = "select-option";

      const truncatedText = truncateText(option.textContent);

      div.innerHTML = `
        <input class="form-check-input option-checkbox" type="checkbox" value="${option.value}">
        <label class="form-check-label" title="${option.textContent}">${truncatedText}</label>
      `;
      optionsContainer.appendChild(div);
    });

    // Toggle dropdown
    selectButton.addEventListener("click", (e) => {
      dropdown.classList.toggle("show");
      e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== selectButton) {
        dropdown.classList.remove("show");
      }
    });

    // Select all functionality
    selectAllCheckbox.addEventListener("change", () => {
      const isChecked = selectAllCheckbox.checked;
      wrapper.querySelectorAll(".option-checkbox").forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
      updateSelectedDisplay();
      updateOriginalSelect();
      updateClearButton();
    });

    // Event listeners for checkboxes
    const checkboxes = wrapper.querySelectorAll(".option-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateSelectAllCheckbox();
        updateSelectedDisplay();
        updateOriginalSelect();
        updateClearButton();
      });
    });

    // Prevent dropdown from closing when clicking inside
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Update "Select All" checkbox state
    function updateSelectAllCheckbox() {
      const totalCheckboxes = checkboxes.length;
      const checkedCheckboxes = Array.from(checkboxes).filter((cb) => cb.checked).length;
      selectAllCheckbox.checked = totalCheckboxes === checkedCheckboxes;
    }

    // Update button display with selected items as chips
    function updateSelectedDisplay() {
      const selectedCheckboxes = Array.from(wrapper.querySelectorAll(".option-checkbox:checked"));
      const count = selectedCheckboxes.length;

      selectButton.innerHTML = "";

      if (count === 0) {
        selectButton.innerHTML = `Select Options`;
      } else {
        const maxVisibleChips = 3;
        let chipsDisplayed = 0;

        selectedCheckboxes.forEach((checkbox, index) => {
          if (index < maxVisibleChips) {
            const chip = document.createElement("span");
            chip.className = "chip";
            const fullText = checkbox.nextElementSibling.title;
            const truncatedText = truncateText(fullText);

            chip.textContent = truncatedText;
            chip.title = fullText;

            const removeIcon = document.createElement("span");
            removeIcon.className = "remove-chip";
            removeIcon.textContent = " ×";
            removeIcon.dataset.value = checkbox.value;

            removeIcon.addEventListener("click", (e) => {
              e.stopPropagation();
              checkbox.checked = false;
              updateSelectAllCheckbox();
              updateSelectedDisplay();
              updateOriginalSelect();
              updateClearButton();
            });

            chip.appendChild(removeIcon);
            selectButton.appendChild(chip);

            chipsDisplayed++;
          }
        });

        if (count > maxVisibleChips) {
          const moreChip = document.createElement("span");
          moreChip.className = "chip more-chip";
          moreChip.textContent = `+${count - maxVisibleChips}`;
          selectButton.appendChild(moreChip);
        }
      }
    }

    // Update original select field
    function updateOriginalSelect() {
      checkboxes.forEach((checkbox) => {
        const option = originalSelect.querySelector(`option[value="${checkbox.value}"]`);
        option.selected = checkbox.checked;
      });
    }

    // Update the visibility of the Clear Selection button
    function updateClearButton() {
      const selectedCount = wrapper.querySelectorAll(".option-checkbox:checked").length;
      clearSelectionButton.style.display = selectedCount > 0 ? "inline-block" : "none";
    }

    // Clear all selections
    function clearSelections() {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      selectAllCheckbox.checked = false;
      updateSelectedDisplay();
      updateOriginalSelect();
      updateClearButton();
    }
  });
});
