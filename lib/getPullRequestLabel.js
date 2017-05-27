import rest from 'restling';

function getPullRequestLabel(githubRepo, validLabels, pullRequestId) {
    const validLabelNames = Object.keys(validLabels);
    const url = `https://api.github.com/repos/${githubRepo}/issues/${pullRequestId}/labels`;

    return rest.get(url)
        .get('data')
        .then((labels) => {
            const listOfLabels = validLabelNames.join(', ');
            const filteredLabels = labels.filter((label) => {
                return validLabelNames.indexOf(label.name) !== -1;
            });

            if (filteredLabels.length > 1) {
                throw new Error(`Pull Request #${pullRequestId} has multiple labels of ${listOfLabels}`);
            } else if (filteredLabels.length === 0) {
                throw new Error(`Pull Request #${pullRequestId} has no label of ${listOfLabels}`);
            }

            return filteredLabels[0].name;
        });
}

export default getPullRequestLabel;
