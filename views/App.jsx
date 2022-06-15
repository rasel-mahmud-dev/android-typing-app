import {useContext, useEffect} from "preact/compat";
import AppContext, {connect} from "./context/AppContext";
import  {h} from 'preact';
import {getAllLessons, getFavoriteLessons} from "./actions";
import Router, {Route} from "preact-router";
import {createHashHistory} from "history";
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import AddPost from "./pages/AddPost";
import AddNewLesson from "./pages/AddNewLesson";
import Play from "./pages/Play";
import BottomNavigation from "./components/BottomNavigation";
import TopNavigation from "./components/TopNavigation";

const App = ()=>{
	
	const appContext = useContext(AppContext);
	
	useEffect(()=>{
		let lessons = getAllLessons()
		appContext.setState({lessons: lessons.lessons, favoriteLessons: lessons.favorite})
	}, [])
	
	function handleClick(){
		if(typeof window.Android !== "undefined") {
			Android.showToast("Send Data to Java")
		}
	}

	
	return (
		<div className="content mt-10">
			
			<button onClick={()=>	Android && Android.addLesson("ASDDDDDDDDDDDDDDDDDDDDDDD")}>ADd</button>
			
			<div className="circle-3"></div>
			<div className="circle-2"></div>
			<div className="circle-1"></div>
			
			<div className="content-glass mt-10 ">
				
				{/*<button className="bg-primary-400 m-10" onClick={handleClick}>Click</button>*/}
				<TopNavigation state={appContext.state} setState={appContext.setState} />
				<Router  history={createHashHistory()} >
					<Route index={true} path="/" component={HomePage} />
					<Route index={true} path="/about" component={AboutPage} />
					<Route index={true} path="/add-post" component={AddPost} />
					<Route index={true} path="/add-new-lesson" component={AddNewLesson} />
					<Route index={true} path="/play/:lessonSection/:lessonName" component={Play} />
					{/*<AsyncRoute*/}
					{/*  path="/login"*/}
					{/*  getComponent={() => import('./pages/LoginPage').then(module => module.default).catch(err=>{})}*/}
					{/*  loading={<h1>sad</h1>}*/}
					{/*/>*/}
				</Router>
				
				{/*<BottomNavigation/>*/}
			
			</div>
		</div>
	)
}



export default App