import { Container, Typography } from "@mui/material"

import { VBox } from "@/components/ui"
import { VotingForm } from "@/features/voting/components/voting-form"

export const VotingRoute = () => {
    return (
        <>
            <Container maxWidth={'sm'}>
                <VBox sx={{ gap: 4, marginTop: 6}}>
                    {/* Heading */}
                    {/* icon */}
                    <Typography variant={'h3'} align="center">
                        CrowdCloud
                    </Typography>

                    <Typography variant={'h6'}>
                        What are you hoping to get out of this session?
                    </Typography>

                    {/* Form */}
                    <VotingForm />
                </VBox>
            </Container>

        </>
    )
}