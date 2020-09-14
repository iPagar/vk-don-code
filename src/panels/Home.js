import React from "react";
import PropTypes from "prop-types";
import { Panel, PanelHeader, Placeholder, Button } from "@vkontakte/vkui/";

const Home = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>Пожертвования</PanelHeader>
		<Placeholder
			action={
				<Button size="l" onClick={go} data-to="type">
					Создать сбор
				</Button>
			}
			stretched
		>
			У Вас пока нет сборов.
			<br />
			Начните доброе дело.
		</Placeholder>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
