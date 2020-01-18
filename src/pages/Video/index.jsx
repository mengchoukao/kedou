import React, { Component } from 'react';
import Header from '../../components/header'
import Tabs from '../../components/tabs'
import { connect } from 'react-redux'
import { getHomeVideoList, getHomeLabelList } from '@/store/action/video'
import Login from '../../components/login'
import './index.less'
const stateToProps = (state) => {
	return {
		video: state.video,
	}
}
const mapDispatchToProps = {
	getHomeVideoList,
	getHomeLabelList,
};


@connect(
	stateToProps,
	mapDispatchToProps
)
class Video extends Component {
	constructor(props) {
		super(props)

		this.state = {
			headerShow: true,
			loginShow: false,
			my:false
		}
	}
	getHomeLabelList = async (num) => {
		await this.props.getHomeVideoList({
			rows: ''
		})
		await this.props.getHomeLabelList({
			type: num
		})
	}
	headerShow = (b) => {
		this.setState({
			headerShow: b
		})
	}
	componentDidMount() {
		this.getHomeLabelList(0)
	}
	testCallBack = () => {
		//console.log(123);
	}
	testRightCallBack = () => {


		if(this.state.loginShow&&sessionStorage.getItem('user_id')){
			this.setState({
				loginShow: !this.state.loginShow
			})
		}else if(!this.state.loginShow&&sessionStorage.getItem('user_id')){
			this.setState({
				my:!this.state.my
			})
		}else{
			this.setState({
				loginShow: !this.state.loginShow
			})
		}
		
	
	}
	goToVideoDetail = (obj) => {
		const {
			video_id
		} = obj
		if(!sessionStorage.getItem('user_id')){
			this.setState({
				loginShow:!this.state.loginShow
			})
			return false
		}
		this.props.history.push(`/detailVideo/video_id=${video_id}`)
	}
	Popo = () => {
		const arr = [
			{
				src: `user_favorite_btn.png`,
				title: '我的收藏',
				goto: '/collect'
			}, {
				src: `user_feedback_btn.png`,
				title: '意见反馈',
				goto: '/userfeedback'
			},
			{
				src: 'user_close_btn.png',
				title: '退出登录',
				goto: '/'
			}
		]
		return (
			arr.map(e => {
				console.log(e);

				return (
					<div key={e.goto} onClick={()=>{
						if(e.title==='退出登录'){
                            sessionStorage.removeItem('user_id')
                            this.setState({
                                my:false
                            })
                            return false
						}
						this.props.history.push(e.goto)
					}}>
						<div style={{
							width: '70%',
							margin: 'auto',
							padding: '.1rem'
						}}>
							<img src={require(`@/assets/images/${e.src}`)} alt="" style={{
								width: '100%',
								height: '100%'
							}} />
						</div>
						<p style={{
							textAlign: 'center',
							padding:'0 0 .1rem 0'
						}}>{e.title}</p>

					</div>
				)
			})
		)
	}
	render() {
		// console.log(this.props);
		const {
			video
		} = this.props
		const { loginShow,my } = this.state
		const tabsParameter = {
			newVideoList: video.newVideoList,
			hotVideoList: video.hotVideoList,
			labelList: video.labelList,
			recommend: video.recommend,
			hotLabel: video.hotLabel,
			getHomeLabelList: this.props.getHomeLabelList,
			goToVideoDetail: this.goToVideoDetail,
			headerShow: this.headerShow,
		}
		const videoHeader = {
			leftCallBack: this.testCallBack,
			rightCallBack: this.testRightCallBack,
            type:'video'
		}
		return (
			< div id='home-video'>
				{this.state.headerShow && <Header {...videoHeader} />}
				<Tabs {...tabsParameter} />
				{loginShow && <Login rightCallBack={this.testRightCallBack} />}
				{
					my&&<div style={{
						position: 'fixed',
						top: '1rem',
						left: '.1rem',
						zIndex: '1000',
						padding: '.1rem',
						backgroundColor: '#fff',
						borderRadius: '.1rem'
					}}>
						{
							this.Popo()
						}
						<div style={{
							position: 'absolute',
							top: '-.2rem',
							left: '20%',
							borderTop: ' .1rem solid transparent',
							borderBottom: '.1rem solid #fff',
							borderLeft: '.1rem solid transparent',
							borderRight: '.1rem solid transparent'
						}}></div>
					</div>
				}
			</div >
		);
	}
}

export default Video;