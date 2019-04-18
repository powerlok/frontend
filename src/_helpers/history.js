import { createBrowserHistory} from 'history';
//import { useRouterHistory } from 'react-router'

export const history = createBrowserHistory({basename: '/'});
/*
export const history = useRouterHistory(createBrowserHistory)({
    basename: '/'
  })*/