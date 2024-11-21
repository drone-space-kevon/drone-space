"use client";

import React, { useState } from "react";

import NextImage from "next/image";

import { Avatar, Badge, Card, Divider, Group, Image, Stack, Text, Title } from "@mantine/core";

import classes from "./Main.module.scss";

import { typeTeam } from "@/types/team";

export default function Main({ data }: { data: typeTeam }) {
	return (
		<Card withBorder shadow="xs" h={"100%"}>
			<Stack gap={"xl"} align="center">
				{data.groups && data.groups?.length > 0 && (
					<Group justify="end" w={"100%"}>
						{data.groups.includes("advisory board") ? (
							<Badge size="xs" variant="light">
								advisory board
							</Badge>
						) : (
							<Badge size="xs" variant="light">
								board & management
							</Badge>
						)}
					</Group>
				)}

				{data.image ? (
					<Stack h={"100%"} w={120} className={classes.imageContainer}>
						<Image
							src={data.image}
							alt={data.name}
							loading="lazy"
							component={NextImage}
							width={1080}
							height={1080}
						/>
					</Stack>
				) : (
					<Avatar size={120} radius={"sm"} color="sec.4" style={{ boxShadow: "var(--mantine-shadow-xs)" }} />
				)}

				{/* <Stack gap={"lg"}> */}
				<Stack gap={"xs"} w={"100%"}>
					<Title order={2} fz={"md"} fw={"bold"} ta={"center"}>
						{data.name}
					</Title>

					<Text fz={"xs"} fw={500} c={"dimmed"} ta={"center"}>
						{data.position}
					</Text>
				</Stack>

				{/* <Divider w={{ base: 80 }} size={"sm"} color="pri" />

					<Text fz={"xs"} fw={500} c={"dimmed"}>
						{data.bio}
					</Text> */}
				{/* </Stack> */}
			</Stack>
		</Card>
	);
}
