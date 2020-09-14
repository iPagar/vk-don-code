import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { View, ScreenSpinner, ConfigProvider } from "@vkontakte/vkui/";
import {
	HashRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useLocation,
	useParams,
} from "react-router-dom";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Type from "./panels/Type";
import Donation from "./panels/Donation";
import Extra from "./panels/Extra";
import Snippet from "./panels/Snippet";

const App = () => {
	const [activePanel, setActivePanel] = useState("home");
	const [history, setHistory] = useState(["home"]);
	const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === "VKWebAppUpdateConfig") {
				const schemeAttribute = document.createAttribute("scheme");
				schemeAttribute.value = data.scheme
					? data.scheme
					: "client_light";
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
	}, []);

	const goBack = () => {
		const newHistory = [...history];
		newHistory.pop();
		const newActivePanel = newHistory[newHistory.length - 1];
		if (newActivePanel === "home") {
			bridge.send("VKWebAppDisableSwipeBack");
		}
		setHistory(newHistory);
		setActivePanel(newActivePanel);
	};

	const goForward = (e) => {
		const newActivePanel = e.currentTarget.dataset.to;
		const newHistory = [...history];
		newHistory.push(newActivePanel);
		if (newActivePanel === "home") {
			bridge.send("VKWebAppEnableSwipeBack");
		}
		setHistory(newHistory);
		setActivePanel(newActivePanel);
	};

	window.onpopstate = function(event) {};

	return (
		<ConfigProvider isWebView={true}>
			<View
				onSwipeBack={goBack}
				history={history}
				activePanel={activePanel}
			>
				<Home id="home" go={goForward} />
				<Type id="type" go={goForward} back={goBack} />
				<Donation id="donation" go={goForward} back={goBack} />
				<Donation
					id="donationEvery"
					go={goForward}
					back={goBack}
					every
				/>
				<Extra id="extra" go={goForward} back={goBack} />
				<Snippet id="snippet" go={goForward} back={goBack} />
			</View>
		</ConfigProvider>
	);
};

export default App;
