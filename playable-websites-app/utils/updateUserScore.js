// Function to update the user's score
async function updateUserScore(userId, pointsToAdd) {
    try {
        const response = await fetch('/api/updateScore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, pointsToAdd })
        });

        if (response.ok) {
            const data = await response.json();
            return data.newScore; // Return the new score
        } else {
            console.error('Failed to update score');
            return null;
        }
    } catch (error) {
        console.error('Error updating score:', error);
        return null;
    }
}

export default updateUserScore;
