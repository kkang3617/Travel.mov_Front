import { createContext, useEffect, useState } from "react";

// 전역 Context 생성
const AuthContext = createContext({
	isLoggedIn: false, 	// 로그인 여부 추적
	id: '',
	onLogout: () => { },
	onLogin: (id, pw) => { },
	setUserInfo: () => { }
});

// 자식 컴포넌트들에게 인증 상태와 관련된 함수들을 전달할 수 있는 provider
export const AuthContextProvider = props => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [nick, setNick] = useState('');

	// 컴포넌트가 렌더링될 때 localStorage에서 로그인 정보를 가지고 와서 상태를 설정.
	useEffect(() => {
		if (localStorage.getItem('isLoggedIn') === '1') {
			setIsLoggedIn(true);
			setNick(localStorage.getItem('LOGIN_USERNICK'));
		}
	}, []);

	// 로그인 핸들러
	const loginHandler = (token, nick) => {
		localStorage.setItem('isLoggedIn', '1');
		// json에 담긴 인증정보를 클라이언트에 보관
		// 1. 로컬 스토리지 - 브라우저가 종료되어도 보관됨.
		// 2. 세션 스토리지 - 브라우저가 종료되면 사라짐.
		localStorage.setItem('ACCESS_TOKEN', token);
		localStorage.setItem('LOGIN_USERNICK', nick);
		setIsLoggedIn(true);
		setNick(nick);
	};

	// 로그아웃 핸들러
	const logoutHandler = () => {
		localStorage.clear();
		setIsLoggedIn(false);
	};

	// 토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
	const setLoginUserInfo = ({ token, nick }) => {
		localStorage.setItem('ACCESS_TOKEN', token);
		localStorage.setItem('LOGIN_USERNICK', nick);
	}

	return (
		<AuthContext.Provider value={{
			isLoggedIn,
			nick,
			onLogout: logoutHandler,
			onLogin: loginHandler,
			setUserInfo: setLoginUserInfo
		}}>
			{props.children}
		</AuthContext.Provider>
	);

}

export default AuthContext;