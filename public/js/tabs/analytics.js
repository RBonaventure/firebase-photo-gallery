$("#update-ga").click(function() {
    const ga = $("#ga").val();
    firebase.database().ref("/analytics").update({ga_id: ga}).then(result => {
        showSnackbar("L'ID Google Analytics a été mis à jour avec succès.");
    }).catch(errorHandler);
});

$("#update-analytics-clientid").click(function() {
    const token = $("#token").val();
    firebase.database().ref("/analytics").update({ga_token: token}).then(result => {
        showSnackbar("Le Client ID Google Analytics API a été mis à jour avec succès.");
    }).catch(errorHandler);
});

const enableAnalyticsChart = (token) => {
    
    gapi.analytics.ready(function() {

        /**
         * Authorize the user immediately if the user has already granted access.
         * If no access has been created, render an authorize button inside the
         * element with the ID "embed-api-auth-container".
         */
        gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid: token
        });

        /**
         * Create a new ViewSelector instance to be rendered inside of an
         * element with the id "view-selector-container".
         */
        var viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector-container'
        });

        // Render the view selector to the page.
        viewSelector.execute();

        /**
         * Create a new DataChart instance with the given query parameters
         * and Google chart options. It will be rendered inside an element
         * with the id "chart-container".
         */
        var dataChart = new gapi.analytics.googleCharts.DataChart({
        query: {
            metrics: 'ga:sessions',
            dimensions: 'ga:date',
            'start-date': '30daysAgo',
            'end-date': 'yesterday'
        },
        chart: {
            container: 'chart-container',
            type: 'LINE',
            options: {
            width: '100%'
            }
        }
        });

        /**
         * Render the dataChart on the page whenever a new view is selected.
         */
        viewSelector.on('change', function(ids) {
        dataChart.set({query: {ids: ids}}).execute();
        });

    });
};