import { VBox } from "@/components/ui"
import { Button, TextField } from "@mui/material"

export const VotingForm = () => {
    return (
        <>
            <VBox sx={{ width: '100%', alignItems: 'center' }}>
                <TextField fullWidth label={'Enter a word'} />
                <TextField fullWidth label={'Enter another word'} />
                <TextField fullWidth label={'Enter another word'} />
                <Button variant="outlined" type="submit" sx={{ width: '140px' }}>
                    Submit
                </Button>
            </VBox>
        </>
    )
}