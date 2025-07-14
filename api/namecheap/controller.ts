import { Request, Response } from 'express';
import { checkDomainAvailability, registerDomain, ContactInfo } from '../../utils/namecheap';

/**
 * Check if a domain is available for registration
 * @param req Express request object
 * @param res Express response object
 */
export async function checkDomain(req: Request, res: Response) {
  try {
    const { domains } = req.body;

    if (!domains || !Array.isArray(domains) || domains.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of domain names to check'
      });
    }

    const results = await checkDomainAvailability(domains);
    
    return res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error checking domain availability:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    });
  }
}

/**
 * Register a new domain
 * @param req Express request object
 * @param res Express response object
 */
export async function registerNewDomain(req: Request, res: Response) {
  try {
    const {
      domain,
      years,
      registrantInfo,
      techInfo,
      adminInfo,
      auxInfo,
      nameservers,
      addFreeWhoisguard,
      enableWhoisguard
    } = req.body;

    // Validate required fields
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: 'Domain name is required'
      });
    }

    if (!years || isNaN(years) || years < 1 || years > 10) {
      return res.status(400).json({
        success: false,
        message: 'Years must be a number between 1 and 10'
      });
    }

    if (!registrantInfo) {
      return res.status(400).json({
        success: false,
        message: 'Registrant information is required'
      });
    }

    // Validate registrant info
    const requiredFields = [
      'firstName',
      'lastName',
      'address1',
      'city',
      'stateProvince',
      'postalCode',
      'country',
      'phone',
      'emailAddress'
    ];

    for (const field of requiredFields) {
      if (!registrantInfo[field as keyof ContactInfo]) {
        return res.status(400).json({
          success: false,
          message: `Registrant ${field} is required`
        });
      }
    }

    // Check if the domain is available before registering
    const availabilityCheck = await checkDomainAvailability([domain]);
    const isDomainAvailable = availabilityCheck.some((result: any) => 
      result.$.Domain === domain && result.$.Available === 'true'
    );

    if (!isDomainAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Domain is not available for registration'
      });
    }

    // Register the domain
    const result = await registerDomain(
      domain,
      years,
      registrantInfo,
      techInfo,
      adminInfo,
      auxInfo,
      nameservers,
      addFreeWhoisguard !== false, // Default to true if not specified
      enableWhoisguard !== false // Default to true if not specified
    );

    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error registering domain:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    });
  }
}