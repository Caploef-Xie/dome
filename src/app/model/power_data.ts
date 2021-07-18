export class IPower {
    id?: Number;
    total_raw_bytes_power?: Number;
    total_qa_bytes_power?: Number;
    qa_smoothed_position_estimate?: Number;
    qa_smoothed_velocity_estimate?: Number;
    total_pledge_collateral?: Number;
    height?: Number
}

export class Power implements IPower {
    id?= 0;
    total_raw_bytes_power = 0;
    total_qa_bytes_power = 0;
    qa_smoothed_position_estimate = 0;
    qa_smoothed_velocity_estimate = 0;
    total_pledge_collateral = 0;
    height = 0
}