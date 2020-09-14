import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FormLayout,
	Input,
	Textarea,
	SelectMimicry,
	FixedLayout,
	Button,
	Div,
	Avatar,
	Snackbar,
} from "@vkontakte/vkui/";
import Cover from "./Cover";
import Icon24ErrorCircle from "@vkontakte/icons/dist/24/error_circle";

const orangeBackground = {
	backgroundImage: "linear-gradient(135deg, #ffb73d, #ffa000)",
};

const Donation = ({ id, go, back, every }) => {
	const [img, setImg] = useState(localStorage.getItem("img"));
	const [title, setTitle] = useState(
		localStorage.getItem("title") !== null
			? localStorage.getItem("title")
			: ""
	);
	const [sum, setSum] = useState(
		localStorage.getItem("sum") !== null ? localStorage.getItem("sum") : ""
	);
	const [aim, setAim] = useState(
		localStorage.getItem("aim") !== null ? localStorage.getItem("aim") : ""
	);
	const [desc, setDesc] = useState(
		localStorage.getItem("desc") !== null
			? localStorage.getItem("desc")
			: ""
	);
	const [snackbar, setSnackbar] = useState();

	const onCoverChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = function(e) {
			const { result } = e.target;

			localStorage.setItem("img", result);
			setImg(result);
		};
	};

	const onCoverClick = () => {
		localStorage.removeItem("img");
		setImg(null);
	};

	const checkForm = (e) => {
		if (!(img && title && sum && aim && desc)) {
			setSnackbar(
				<Snackbar
					layout="vertical"
					onClose={() => setSnackbar()}
					before={
						<Avatar size={24} style={orangeBackground}>
							<Icon24ErrorCircle
								fill="#fff"
								width={14}
								height={14}
							/>
						</Avatar>
					}
				>
					Заполните форму
				</Snackbar>
			);
		} else {
			go(e);
		}
	};

	return (
		<Panel id={id} centered>
			<PanelHeader left={<PanelHeaderBack onClick={back} />}>
				{every ? "Регулярный сбор" : "Целевой сбор"}
			</PanelHeader>

			<FormLayout style={{ paddingBottom: 60 }}>
				<Cover
					img={img}
					onChange={onCoverChange}
					onClick={onCoverClick}
				/>
				<Input
					value={title}
					type="text"
					top="Название сбора"
					placeholder="Название сбора"
					onChange={(e) => {
						const { value } = e.target;

						localStorage.setItem("title", value);
						setTitle(value);
					}}
				/>
				<Input
					value={sum}
					type="number"
					top={every ? "Сумма в месяц, ₽" : "Сумма, ₽"}
					placeholder={
						every
							? "Например, лечение человека"
							: "Сколько нужно собрать?"
					}
					onChange={(e) => {
						const { value } = e.target;

						localStorage.setItem("sum", value);
						setSum(value);
					}}
				/>
				<Input
					value={aim}
					type="text"
					top="Цель"
					placeholder={
						every
							? "Например, поддержка приюта"
							: "Например, лечение человека"
					}
					onChange={(e) => {
						const { value } = e.target;

						localStorage.setItem("aim", value);
						setAim(value);
					}}
				/>
				<Textarea
					value={desc}
					type="text"
					top="Описание"
					placeholder="На что пойдут деньги и как они кому-то помогут?"
					onChange={(e) => {
						const { value } = e.target;

						localStorage.setItem("desc", value);
						setDesc(value);
					}}
				/>
				<SelectMimicry top="Куда получать деньги">
					Счёт VK Pay · 1234
				</SelectMimicry>
				{every && (
					<SelectMimicry top="Автор">Матвей Правосудов</SelectMimicry>
				)}
			</FormLayout>

			<FixedLayout vertical="bottom" filled>
				<Div>
					<Button
						size="l"
						onClick={checkForm}
						data-to={every ? "snippet" : "extra"}
						stretched
					>
						{every ? "Создать сбор" : "Далее"}
					</Button>
				</Div>
			</FixedLayout>
			{snackbar}
		</Panel>
	);
};

Donation.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	back: PropTypes.func.isRequired,
	every: PropTypes.bool,
};

export default Donation;
