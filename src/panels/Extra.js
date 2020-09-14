import React from "react";
import PropTypes from "prop-types";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FormLayout,
	FormLayoutGroup,
	SelectMimicry,
	FixedLayout,
	Button,
	Div,
	Radio,
} from "@vkontakte/vkui/";

const Extra = ({ id, go, back }) => (
	<Panel id={id}>
		<PanelHeader left={<PanelHeaderBack onClick={back} />}>
			Дополнительно
		</PanelHeader>
		<FormLayout style={{ paddingBottom: 60 }}>
			<SelectMimicry top="Автор">Матвей Правосудов</SelectMimicry>
			<FormLayoutGroup top="Сбор завершится">
				<Radio name="radio" value="1">
					Когда соберём сумму
				</Radio>
				<Radio name="radio" value="2" defaultChecked>
					В определённую дату
				</Radio>
			</FormLayoutGroup>
			<SelectMimicry top="Дата окончания" placeholder="Выберите дату" />
		</FormLayout>
		<FixedLayout vertical="bottom" filled>
			<Div>
				<Button size="l" onClick={go} data-to="snippet" stretched>
					Создать сбор
				</Button>
			</Div>
		</FixedLayout>
	</Panel>
);

Extra.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	back: PropTypes.func.isRequired,
};

export default Extra;
