import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
    try {
        const result = await profileService.createProfileIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "Profile Created Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }
};

const getAllProfile = async (req: Request, res: Response) => {
    try {
        const result = await profileService.getAllProfofileFromDB();
        res.status(200).json({
            success: true,
            message: "profiles Retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const getSingleProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await profileService.getSingleProfileFromDB(id as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Profile not found",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            suucess: false,
            message: error.message,
            error: error
        })
    }
}

const updateProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await profileService.updateProfileFromDB(req.body, id as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Profile Not Found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }
}


const deleteProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await profileService.deleteProfileFromDB(id as string);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Profile Not Found",
            })
        }
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: {}
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}



export const profileController = { createProfile, getAllProfile, getSingleProfile, updateProfile, deleteProfile }