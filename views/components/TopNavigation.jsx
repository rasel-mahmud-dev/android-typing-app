import log from "../utils/log";
import {h} from "preact"
import {Link} from "preact-router"



const TopNavigation = (props)=>{
	

	const {state, setState} = props

	function handleToggleSound(){
		setState({
			isMute: !state.isMute
		})
	}
	
	return (
		<div className="top_navigation">
			<div className="nav_content">
				<div className="flex items-center justify-center">
					<Link href="/#">
						<svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/></svg>
					</Link>
					<span id="refresh">
						{/*<FontAwesomeIcon icon={ref} />*/}
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						 <path
							 d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"/></svg>
         </span>
				</div>
				
				<div id="lesson-title">{state.lesson && state.lesson.label}</div>
				
				<div className="flex right-nav items-center">
         
					
					
					{/*<span className="nav-badge" id="speed-meter"></span>*/}
					{/*<span className="nav-badge" id="time-running"></span>*/}
					
					<span className="sound-btn">
						{state.isMute
							? <svg onClick={handleToggleSound} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path
									d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"/>
							</svg>
							: <svg onClick={handleToggleSound} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
								<path
									d="M192 387.92a139 139 0 0 0-32-3.92c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V327.88l-64-49.46zm441.82 70.18l-65.06-50.28c4.51-7.37 7.24-15.35 7.24-23.82V32a32 32 0 0 0-41.62-30.49L214.41 96a31.85 31.85 0 0 0-21 21.73L45.47 3.39A16 16 0 0 0 23 6.2L3.37 31.47a16 16 0 0 0 2.81 22.45l588.35 454.71a16 16 0 0 0 22.47-2.81l19.63-25.27a16 16 0 0 0-2.81-22.45zM512 323.92a139 139 0 0 0-32-3.92 137 137 0 0 0-22.15 2.11l-156.61-121L512 139.3z"/>
							</svg>
						}
         </span>
					
					<Link href="#add-new-lesson">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
					</Link>
					
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
					
				</div>
			
			</div>
		</div>
	)
}

export default TopNavigation