import { VBox } from "@/components/ui"
import { Cloud } from "@/features/presentation/components/cloud"
import { Typography } from "@mui/material"

export const PresentationRoute = () => {
    return (
        <>
            <VBox>
                <Typography variant="h3">
                    CrowdCloud Presentation
                </Typography>

                <Cloud/>
            </VBox>
        </>
    )
}