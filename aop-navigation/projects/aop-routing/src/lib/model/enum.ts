export enum NavError {
    OBSERVABLE_REQUIRED = 'To use route async, method must return an observable<string | NavAux>',
    OBSERVABLE_STREAM = 'encountered error in observable stream',
    UPDATING_NAVAUX = 'Error updating NavAux instance',
    PREPROCRESS_FUNC = 'An error occurred executing function ',
    ROUTING = 'could not route to ',
    LOCATION_BACK = 'failed to popState navigate',
    STATE_HISTORY = 'failed to load specific page from session history'
}
