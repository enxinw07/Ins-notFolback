function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

async function processFiles() {
    const followersFile = document.getElementById('followersFile').files[0];
    const followingFile = document.getElementById('followingFile').files[0];
    
    if (!followersFile || !followingFile) {
        alert('Please select both files.');
        return;
    }

    try {
        const [followersHtml, followingHtml] = await Promise.all([
            readFile(followersFile),
            readFile(followingFile)
        ]);

        const followers = extractUsernames(followersHtml);
        const following = extractUsernames(followingHtml);

        const notFollowingBack = following.filter(username => !followers.includes(username));

        displayResult(notFollowingBack);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the files.');
    }
}

function extractUsernames(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.querySelectorAll('a'))
        .filter(a => a.href)
        .map(a => a.textContent);
}

function displayResult(usernames) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<ul>' + usernames.map(user => '<li>' + user + '</li>').join('') + '</ul>';
}
