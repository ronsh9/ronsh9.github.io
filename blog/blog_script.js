document.addEventListener('DOMContentLoaded', async () => {
    // Explicit list of directories
    const directories = ['12-21-2024-coming_soon'];

    const blogPostsContainer = document.getElementById('blog-posts');

    for (const dir of directories) {
        const postUrl = `posts/${dir}/index.html`;

        try {
            // Fetch the index.html of the directory
            const response = await fetch(postUrl);
            const text = await response.text();

            // Parse the HTML and extract metadata
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const title = doc.querySelector('meta[name="title"]')?.getAttribute('content') || 'Untitled';
            const date = doc.querySelector('meta[name="date"]')?.getAttribute('content') || 'Unknown Date';

            // Create a boxed container for the blog post
            const postBox = document.createElement('div');
            postBox.classList.add('blog-post-box');

            // Add title and date to the container
            const postTitle = document.createElement('h2');
            postTitle.textContent = title;

            const postDate = document.createElement('p');
            postDate.textContent = `Date: ${date}`;
            postDate.classList.add('blog-post-date');

            postBox.appendChild(postTitle);
            postBox.appendChild(postDate);

            // Make the container clickable
            postBox.addEventListener('click', () => {
                window.location.href = postUrl;
            });

            blogPostsContainer.appendChild(postBox);
        } catch (error) {
            console.error(`Failed to fetch or parse ${postUrl}:`, error);
        }
    }
});
