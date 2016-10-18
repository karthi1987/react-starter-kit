import Ajax, * as ajax from 'utils/ajax';
import extend from 'lodash/object/extend';

/*******************************************************************************
 *
 *   1. Default State
 *   2. Action Types
 *   3. ACtion Creators
 *   4. Reducers
 *
 */

/*******************************************************************************
 *  1. Default State
 */

const appState = {
    viewportWidth: 0,
    viewportHeight: 0,
    loading: {},
    loaded: {},
    loadingError: {},
    data: {},
    FEEDS: {}
};

/*******************************************************************************
 *  2. Action Types
 */

export const TYPEs = {
    DATA_LOADING: 'dataLoading',
    DATA_LOADED: 'dataLoaded',
    DATA_LOADING_ERROR: 'dataLoadingError',
    APP_DATA: 'appData',
    LOAD_APP_DATA: 'loadAppData',
    GET_VIEWPORT_SIZE: 'getViewportSize',
}

/*******************************************************************************
 *  3. Action Creators
 */

export function getAppData(){
    return ( dispatch ) => {
        let type = TYPEs.APP_DATA;

        dispatch( ajax.loading( type ) );

        Ajax({
            url: '/react-starter-kit/mock/json/app-home.json',//FEEDS.APP,
            type: 'GET',
            success: ( results ) => {
                if( !results.success ){
                    dispatch( ajax.loadingError( type, error ) )
                }else{
                    dispatch({
                        type: TYPEs.LOAD_APP_DATA,
                        results: results.data
                    })

                    dispatch( ajax.loaded( type ) )
                }
            },
            fail: ( error ) => {
                dispatch( ajax.loadingError( type, error ) )
            }
        });
    }
}

export function getViewportSize(){
    return {
        type: TYPEs.GET_VIEWPORT_SIZE,
        width: window.innerWidth,
        height: window.innerHeight
    }
}

/*******************************************************************************
 *  4. Reducers
 */

export default ( state = appState, action ) => {

    let loading = ( bool ) => {
        return extend( {}, state.loading, { [ action.loading || action.loaded || action.loadingError ]: bool } );
    }
    let loaded = ( bool ) => {
        return extend( {}, state.loaded, { [ action.loaded ]: bool } );
    }
    let loadingError = ( error ) => {
        return extend( {}, state.loadingError, { [ action.loadingError ]: error } );
    }

    switch( action.type ) {

        case TYPEs.GET_VIEWPORT_SIZE:
             return {
                ...state,
                viewportWidth: action.width,
                viewportHeight: action.height
             }

        case TYPEs.DATA_LOADING:
            return{
                ...state,
                loading: loading( true)
            }
            
        case TYPEs.DATA_LOADED:
            return{
                ...state,
                loaded: loaded( true ),
                loading: loading( false )
            }

        case TYPEs.DATA_LOADING_ERROR:
            return{
                ...state,
                loadingError: loadingError( action.error ),
                loading: loading( false )
            }

        case TYPEs.LOAD_APP_DATA:
    		 return{
    		 		...state,
                activeUser: action.results,
                data: action.results
            }

        default:
            return state;
    }
}
