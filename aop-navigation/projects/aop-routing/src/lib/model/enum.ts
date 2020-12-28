export enum NavError {
    OBSERVABLE_REQUIRED = 'To use route async, method must return an observable<string | NavAux>',
    OBSERVABLE_STREAM = 'Encountered error in observable stream',
    UPDATING_NAVAUX = 'Error updating NavAux instance',
    PREPROCRESS_FUNC = 'An error occurred executing function ',
    ROUTING = 'Could not route to ',
    LOCATION_BACK = 'Failed to popState navigate',
    STATE_HISTORY = 'Failed to load specific page from session history',
    EXPIREMENTAL_FEATURE_ROUTE_TRANSFORM = 'Cannot use RouteTransform object with experimental flag turned off'
}
