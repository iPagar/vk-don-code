import React from "react";
import PropTypes from "prop-types";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	CardGrid,
	Card,
	SimpleCell,
} from "@vkontakte/vkui/";
import Icon28TargetOutline from "@vkontakte/icons/dist/28/target_outline";
import Icon28CalendarOutline from "@vkontakte/icons/dist/28/calendar_outline";

const Type = ({ id, go, back }) => (
	<Panel id={id} centered>
		<PanelHeader left={<PanelHeaderBack onClick={back} />}>
			Тип сбора
		</PanelHeader>
		<CardGrid>
			<Card size="l">
				<SimpleCell
					before={<Icon28TargetOutline />}
					onClick={go}
					data-to="donation"
					description={"Когда есть определённая цель"}
					expandable
				>
					Целевой сбор
				</SimpleCell>
			</Card>
			<Card size="l">
				<SimpleCell
					before={<Icon28CalendarOutline />}
					onClick={go}
					data-to="donationEvery"
					description={"Если помощь нужна ежемесячно"}
					expandable
				>
					Регулярный сбор
				</SimpleCell>
			</Card>
		</CardGrid>
	</Panel>
);

Type.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	back: PropTypes.func.isRequired,
};

export default Type;
