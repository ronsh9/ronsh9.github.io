// Table of contents

document.addEventListener("DOMContentLoaded", function () {
    const tocList = document.getElementById("toc-list");
    const headings = document.querySelectorAll(".content h1, .content h2, .content h3");

    // Function to create a list item for each heading
    function createTOCItem(heading) {
        const li = document.createElement("li");
        li.style.marginLeft = heading.tagName === "H2" ? "20px" : heading.tagName === "H3" ? "40px" : "0px";

        const a = document.createElement("a");
        a.textContent = heading.textContent;
        a.href = `#${heading.id}`;
        a.style.textDecoration = "none";

        li.appendChild(a);
        return li;
    }

    // Populate the Table of Contents
    headings.forEach((heading) => {
        if (heading.id) {
            const tocItem = createTOCItem(heading);
            tocList.appendChild(tocItem);
        }
    });

    // Collapsible ToC functionality
    const toggleButton = document.querySelector(".toc-toggle");
    const tocContent = document.querySelector(".toc-content");

    if (toggleButton && tocContent) {
        toggleButton.addEventListener("click", function () {
            toggleButton.classList.toggle("active");
            if (tocContent.classList.contains("expanded")) {
                tocContent.classList.remove("expanded");
                tocContent.style.maxHeight = null; // Collapse
            } else {
                tocContent.classList.add("expanded");
                tocContent.style.maxHeight = tocContent.scrollHeight + "px"; // Expand
            }
        });
    }
});






// Citation section

document.addEventListener("DOMContentLoaded", function () {
    // Extract metadata
    const title = document.title.split(" - ")[0];
    const author = document.querySelector("meta[name='author']").content;
    const date = document.querySelector("meta[name='date']").content;
    const url = document.querySelector("meta[name='url']").content;

    // Parse author to [last name], [first name]
    const [firstName, lastName] = author.split(" ");
    const formattedAuthor = `${lastName}, ${firstName}`;

    // Parse the date format (MM/DD/YYYY) to desired format
    const parsedDate = new Date(date);
    const formattedMonthYear = `${parsedDate.toLocaleString('en-US', { month: 'short' })} ${parsedDate.getFullYear()}`;

    // Format citation
    const citationHTML = `
        <p>Cite as:</p>
        <blockquote>
            ${formattedAuthor}. (${formattedMonthYear}). Personal Blog. 
            <a href="${url}" target="_blank">${title}</a>. ${url}.
        </blockquote>
        <p>Or</p>
        <pre>
@article{${lastName.toLowerCase()}${parsedDate.getFullYear()}${title.toLowerCase().replace(/\s/g, '')},
  <span style="color: #FFC225;">title</span> = "${title}",
  <span style="color: #FFC225;">author</span> = "${formattedAuthor}",
  <span style="color: #FFC225;">journal</span> = "ronsh9.github.io",
  <span style="color: #FFC225;">year</span> = "${parsedDate.getFullYear()}",
  <span style="color: #FFC225;">month</span> = "${parsedDate.toLocaleString('en-US', { month: 'short' })}",
  <span style="color: #FFC225;">url</span> = "${url}"
}</pre>
    `;

    // Insert citation into the citation-section
    const citationSection = document.getElementById("citation-section");
    if (citationSection) {
        citationSection.innerHTML = citationHTML;
    }
});





// References
document.addEventListener("DOMContentLoaded", async () => {
    const referencesFile = "./references.bib"; // Path to the references file
    const referenceMap = {};
    const citedReferences = new Set();

    // Load and parse the BibTeX file
    async function loadReferences() {
        const response = await fetch(referencesFile);
        const text = await response.text();

        // Use a regex to match all BibTeX entries
        const entryRegex = /@.*?\{([^,]+),([\s\S]*?)\n\}/g;
        let match;

        while ((match = entryRegex.exec(text)) !== null) {
            const key = match[1].trim(); // Citation key
            const entry = `@${match[0].trim()}`; // Complete BibTeX entry
            referenceMap[key] = entry;
        }
    }

    // Format author names
    function formatAuthors(authors) {
        if (!authors) return "";
        const names = authors.split(" and "); // Split author names by ' and '
        if (names.length === 0) return "";

        // Process the first author
        const firstAuthor = names[0];
        const parts = firstAuthor.split(",").map((part) => part.trim());
        let formattedName = "";

        if (parts.length === 2) {
            const lastName = parts[0]; // Preserve last name exactly as given
            const firstName = parts[1];
            const initials = firstName
                .split(" ")
                .map((word) => word[0].toUpperCase() + ".") // Get the first letter as an initial
                .join(" ");
            formattedName = `${initials} ${lastName}`;
        } else {
            formattedName = firstAuthor.trim(); // Fallback in case of unexpected format
        }

        // Add "et al." if there are more authors
        if (names.length > 1) {
            formattedName += " et al.";
        }

        return formattedName;
    }

    // Parse BibTeX and format references
    function formatReference(key) {
        const entry = referenceMap[key];
        if (!entry) return "";

        const authorMatch = entry.match(/author=\{(.*?)\}/);
        const titleMatch = entry.match(/title=\{(.*?)\}/);
        const booktitleMatch = entry.match(/booktitle=\{(.*?)\}/);
        const journalMatch = entry.match(/journal=\{(.*?)\}/);
        const yearMatch = entry.match(/year=\{(.*?)\}/);
        const pagesMatch = entry.match(/pages=\{(.*?)\}/);

        const authors = authorMatch ? formatAuthors(authorMatch[1]) : "Unknown author";
        const title = titleMatch ? titleMatch[1].trim() : "Untitled";
        const booktitle = booktitleMatch ? `In: ${booktitleMatch[1].trim()}.` : "";
        const journal = journalMatch ? journalMatch[1].trim() : "";
        const year = yearMatch ? yearMatch[1].trim() : "n.d.";
        const pages = pagesMatch ? `Pages ${pagesMatch[1].trim()}` : "";

        if (journal) {
            return `${authors}. "${title}". ${journal}. (${year}). ${pages}`;
        }
        return `${authors}. "${title}". ${booktitle} (${year}). ${pages}`;
    }

    // Generate numerical citation
    function generateCitation(key) {
        if (!referenceMap[key]) {
            console.warn(`Reference key "${key}" not found.`);
            return `<span class="citation">[?]</span>`;
        }
        citedReferences.add(key);
        const index = [...citedReferences].indexOf(key) + 1;
        return `<a href="#ref-${key}" class="citation">[${index}]</a>`;
    }

    // Generate author-based citation
    function generateAuthorCitation(key) {
        if (!referenceMap[key]) {
            console.warn(`Reference key "${key}" not found.`);
            return `<span class="citation">[?]</span>`;
        }
        const entry = referenceMap[key];
        const authorMatch = entry.match(/author=\{(.*?)\}/);
        const yearMatch = entry.match(/year=\{(.*?)\}/);

        if (authorMatch && yearMatch) {
            const authors = formatAuthors(authorMatch[1]);
            const year = yearMatch[1];
            return `<a href="#ref-${key}" class="citation">${authors} (${year})</a>`;
        }
        return `<span class="citation">[?]</span>`;
    }

    // Render citations in the body
    async function renderCitations() {
        await loadReferences();

        // Process `cite` commands
        document.querySelectorAll("cite").forEach((citeElement) => {
            const key = citeElement.getAttribute("data-key");
            if (key) {
                citeElement.outerHTML = generateCitation(key);
            }
        });

        // Process `cite_author` commands
        document.querySelectorAll("cite_author").forEach((citeElement) => {
            const key = citeElement.getAttribute("data-key");
            if (key) {
                citeElement.outerHTML = generateAuthorCitation(key);
            }
        });

        // Generate the References Section
        const referencesSection = document.getElementById("references-list");
        if (referencesSection) {
            const sortedReferences = [...citedReferences].sort((a, b) => {
                const authorA = referenceMap[a].match(/author=\{(.*?)\}/)?.[1] || "";
                const authorB = referenceMap[b].match(/author=\{(.*?)\}/)?.[1] || "";
                return authorA.localeCompare(authorB);
            });

            sortedReferences.forEach((key) => {
                const formattedReference = formatReference(key);
                referencesSection.innerHTML += `<li id="ref-${key}">${formattedReference}</li>`;
            });
        }
    }

    renderCitations();
});



// Generate title

document.addEventListener("DOMContentLoaded", () => {
    // Get meta information
    const author = document.querySelector('meta[name="author"]').getAttribute("content") || "Unknown Author";
    const date = document.querySelector('meta[name="date"]').getAttribute("content") || "Unknown Date";
    const title = document.querySelector('meta[name="title"]').getAttribute("content") || "Untitled";
    const url = document.querySelector('meta[name="url"]').getAttribute("content") || "#";

    // Find the <ul id="title"> element
    const titleContainer = document.querySelector("ul#title");

    if (titleContainer) {
        // Create title element
        const titleElement = document.createElement("h1");
        titleElement.classList.add("page-title");
        titleElement.textContent = title;

        // Create subtitle element
        const subtitleElement = document.createElement("p");
        subtitleElement.classList.add("page-subtitle");
        subtitleElement.innerHTML = `By <a href="${url}" class="highlight">${author}</a> on <span class="date">${date}</span>`;

        // Clear existing content in the <ul>
        titleContainer.innerHTML = "";

        // Append title and subtitle
        titleContainer.appendChild(titleElement);
        titleContainer.appendChild(subtitleElement);
    } else {
        console.warn("No <ul id='title'> element found. Skipping title generation.");
    }
});

