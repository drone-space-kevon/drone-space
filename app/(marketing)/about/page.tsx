import React from "react";

import { Metadata } from "next";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { AspectRatio, Divider, Grid, GridCol, List, ListItem, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import stats from "@/data/stats";
import CardStat from "@/components/card/Stat";
import CardHub from "@/components/card/Hub";
import videos from "@/assets/videos";
import images from "@/assets/images";
import team from "@/data/team";
import CardTeamMain from "@/components/card/team/Main";

export const metadata: Metadata = { title: "About" };

export default async function About() {
	const data = {
		prose: [
			"Drone Space is the leading provider of drone training and drone services in Kenya. The company offers comprehensive drone license training courses designed to educate and equip professionals with the skills and knowledge to safely and effectively operate drones commercially.",
			"The courses are designed to meet international standards and provide students with hands-on experience and practical knowledge of drone operations. In addition to drone training, Drone Space also offers commercial drone services, including aerial photography and videography, surveying and mapping, inspection and monitoring, and aerial data collection.",
			"Drone Space is an approved Unmanned Aircraft Systems Training Organization (UTO) licensed and certified by the Kenya Civil Aviation Authority (KCAA) to conduct drone training. Drone Space provides Kenya and East Africa's highest quality drone training with a simple yet comprehensive model for enterprise clients, government agencies, public safety departments, and individuals.",
		],
		list: ["Drone Seeding", "Solar Monitoring", "Aerial Cinematography"],
		hub: {
			prose: "	The Drone spaces & Hub will strive to strengthen and accelerate development in technology and innovation through creation of platforms that will enable job creation and entrepreneurship. The Drone Spaces & Hub will manage the largest air space dedicated to drone operators in Konza Technopolis, as well as the administration of its building in Westlands, intended to be a place of business incubation and work spaces for its members. The Drone Spaces and Hub Centers are located in two regions i.e. Westlands and Konza Technopolis. The initiative to create the Centre's are supported by two main players: Drone Space and Konza Technopolis.",
			list: [
				{
					title: "Territorial Ambition",
					list: [
						"To generate activities and jobs",
						"To effectively address the issue of Safety and risks",
						"To bring together industry players in the emerging “Kenya Drone” sector (manufacturers, engineering, fuel incl. hydrogen, maintenance, start-ups, associations, universities, ROCs, UTOs etc.)",
					],
				},
				{
					title: "National Ambition",
					list: [
						"To support the development and integration of all technologies required for the growth of the drone industry",
						"To position Drone Spaces & Hub as enablers in the development of drone technologies and innovation for all",
						"To promote local techies in drone technological know-how and innovation during the Kenya Drone Expo and other innovation events",
					],
				},
				{
					title: "Pan-Africanism",
					list: [
						"To define and harmonize procedures and regulations in Africa",
						"To implement drone standards, traffic management systems and communication and surveillance solutions that facilitate market access for the various players in Africa",
					],
				},
			],
		},
	};

	return (
		<LayoutPage>
			<LayoutSection padded containerized={"responsive"}>
				<Grid gutter={{ base: "xl", md: 48 }}>
					<GridCol span={{ md: 6.5, lg: 6 }}>
						<Stack gap={"xl"}>
							<Title order={2} fw={"bold"} fz={{ md: 24 }} w={{ md: "80%" }}>
								Approved Unmanned Aircraft Systems Training Organization
							</Title>
							<Stack gap={"xs"}>
								{data.prose.map(item => (
									<Text key={item}>{item}</Text>
								))}
							</Stack>
						</Stack>
					</GridCol>
					<GridCol span={{ md: 5.5, lg: 6 }}>
						<Stack gap={"xl"}>
							<AspectRatio ratio={1920 / 1080}>
								<video
									width="100%"
									controls
									autoPlay
									muted
									style={{ borderRadius: "var(--mantine-radius-sm)", overflow: "hidden" }}
									poster={images.gallery.airfield.image1}
								>
									<source src={videos.video1} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</AspectRatio>

							<Stack gap={"xs"}>
								<Text>We specialize in three key areas:</Text>
								<List
									icon={
										<ThemeIcon size={20} color="green.6" c={"white"} radius={"xl"}>
											<IconCheck size={12} />
										</ThemeIcon>
									}
								>
									{data.list.map(item => (
										<ListItem key={item}>{item}</ListItem>
									))}
								</List>
							</Stack>
						</Stack>
					</GridCol>
				</Grid>
			</LayoutSection>

			<LayoutSection
				padded={24}
				containerized={"responsive"}
				bg={"light-dark(var(--mantine-color-pri-9),var(--mantine-color-pri-9))"}
				c={"light-dark(var(--mantine-color-white),var(--mantine-color-white))"}
			>
				<Grid justify="center">
					{stats.map(stat => (
						<GridCol key={stat.title} span={{ base: 12, xs: 4, md: "auto" }}>
							<CardStat data={stat} />
						</GridCol>
					))}
				</Grid>
			</LayoutSection>

			<LayoutSection padded bordered containerized={"responsive"}>
				<Stack gap={"xl"}>
					<Stack gap={"xs"} align="center">
						<Title order={2} fw={"bold"} ta={"center"} fz={{ md: 24 }} w={{ md: "80%" }}>
							Drone Spaces & Hub Mission
						</Title>

						<Text ta={"center"}>{data.hub.prose}</Text>
					</Stack>

					<Grid>
						{data.hub.list.map(item => (
							<GridCol key={item.title} span={{ md: 4 }}>
								<CardHub data={item} />
							</GridCol>
						))}
					</Grid>
				</Stack>
			</LayoutSection>

			<LayoutSection
				padded
				containerized={"responsive"}
				bg={"light-dark(var(--mantine-color-gray-1),var(--mantine-color-gray-1))"}
			>
				<Stack gap={64}>
					<Stack gap={"xs"} align="center">
						<Title order={2} fw={"bold"} ta={"center"} fz={{ md: 24 }} w={{ md: "80%" }}>
							Our Team
						</Title>

						<Text ta={"center"}>Meet the passionate minds driving our vision forward.</Text>
					</Stack>

					<Stack gap={"xl"} align="center">
						<Title order={3} fw={"bold"} ta={"center"} fz={{ md: 20 }} w={{ md: "80%" }}>
							Board & Management
						</Title>

						<Grid>
							<GridCol span={12}>
								<Grid justify="center">
									{team
										.filter(member => member.groups?.includes("management"))
										.map(
											member =>
												team
													.filter(member => member.groups?.includes("management"))
													.indexOf(member) < 2 && (
													<GridCol key={member.name} span={{ xs: 6, sm: 4, md: 3 }}>
														<CardTeamMain data={member} />
													</GridCol>
												)
										)}
								</Grid>
							</GridCol>

							<GridCol span={12}>
								<Grid justify="center">
									{team
										.filter(member => member.groups?.includes("management"))
										.map(
											member =>
												team
													.filter(member => member.groups?.includes("management"))
													.indexOf(member) > 1 && (
													<GridCol key={member.name} span={{ xs: 6, sm: 4, md: 3 }}>
														<CardTeamMain data={member} />
													</GridCol>
												)
										)}
								</Grid>
							</GridCol>

							<GridCol span={12}>
								<LayoutSection containerized={"sm"}>
									<Divider my={"md"} color="pri" variant="dashed" />
								</LayoutSection>
							</GridCol>

							<GridCol span={12}>
								<Grid justify="center">
									{team
										.filter(member => !member.groups)
										.map(member => (
											<GridCol key={member.name} span={{ xs: 6, sm: 4, md: 3 }}>
												<CardTeamMain data={member} />
											</GridCol>
										))}
								</Grid>
							</GridCol>
						</Grid>
					</Stack>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
