// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract CertificateIssuer {
    
    struct Certificate {
        uint256 id;          // Unique certificate ID
        address recipient;   // Address of the certificate recipient
        string data;         // Data associated with the certificate (e.g., name, course, date)
        bool isValid;        // Indicates if the certificate is valid (true) or revoked (false)
    }

    address public owner;             // Address of the contract owner
    uint256 public nextCertificateId; // Counter for the next certificate ID
    mapping(uint256 => Certificate) public certificates; // Mapping from certificate ID to Certificate struct
    mapping(address => uint256[]) public recipientCertificates; // Mapping from recipient address to an array of certificate IDs

    event CertificateIssued(uint256 id, address recipient, string data); // Event emitted when a certificate is issued
    event CertificateRevoked(uint256 id); // Event emitted when a certificate is revoked

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized"); // Restrict access to the contract owner
        _;
    }

    constructor() {
        owner = msg.sender;        // Set the contract owner to the address that deploys the contract
        nextCertificateId = 1;     // Start certificate IDs from 1
    }

    // Function to issue a new certificate
    function issueCertificate(address recipient, string memory data) public onlyOwner {
        certificates[nextCertificateId] = Certificate(nextCertificateId, recipient, data, true); // Create new certificate
        recipientCertificates[recipient].push(nextCertificateId); // Add certificate ID to recipient's list
        emit CertificateIssued(nextCertificateId, recipient, data); // Emit event for certificate issuance
        nextCertificateId++; // Increment the certificate ID counter
    }

   
    // Function to verify the validity of a certificate and fetch its associated data
    function verifyCertificate(uint256 id) public view returns (bool, string memory) {
        Certificate storage cert = certificates[id];
        return (cert.isValid, cert.data); // Return the validity status and associated data of the certificate
    }

    // Function to revoke an existing certificate
    function revokeCertificate(uint256 id) public onlyOwner {
        certificates[id].isValid = false; // Set the certificate's validity status to false
        emit CertificateRevoked(id); // Emit event for certificate revocation
    }

    // // Function to get all certificate IDs issued to a specific recipient
    // function getCertificatesByRecipient(address recipient) public view returns (uint256[] memory) {
    //     return recipientCertificates[recipient]; // Return the array of certificate IDs
    // }
}

// pragma solidity >=0.4.22 <0.9.0;

// contract CertificateIssuer {

//     struct Certificate {
//         string code;        // Unique certificate code
//         address recipient;  // Address of the certificate recipient
//         string data;        // Data associated with the certificate (e.g., name, course, date)
//         bool isValid;       // Indicates if the certificate is valid (true) or revoked (false)
//     }

//     address public owner;  // Address of the contract owner
//     mapping(string => Certificate) public certificates; // Mapping from certificate code to Certificate struct
//     mapping(address => string[]) public recipientCertificates; // Mapping from recipient address to an array of certificate codes

//     event CertificateIssued(string code, address recipient, string data); // Event emitted when a certificate is issued
//     event CertificateRevoked(string code); // Event emitted when a certificate is revoked

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Not authorized"); // Restrict access to the contract owner
//         _;
//     }

//     constructor() {
//         owner = msg.sender; // Set the contract owner to the address that deploys the contract
//     }

//     // Function to issue a new certificate
//     function issueCertificate(address recipient, string memory data) public onlyOwner {
//         string memory code = generateCertificateCode(recipient, data); // Generate unique certificate code
//         certificates[code] = Certificate(code, recipient, data, true); // Create new certificate
//         recipientCertificates[recipient].push(code); // Add certificate code to recipient's list
//         emit CertificateIssued(code, recipient, data); // Emit event for certificate issuance
//     }

//     // Function to verify the validity of a certificate and fetch its associated data
//     function verifyCertificate(string memory code) public view returns (bool, string memory) {
//         Certificate storage cert = certificates[code];
//         return (cert.isValid, cert.data); // Return the validity status and associated data of the certificate
//     }

//     // // Function to revoke an existing certificate
//     // function revokeCertificate(string memory code) public onlyOwner {
//     //     certificates[code].isValid = false; // Set the certificate's validity status to false
//     //     emit CertificateRevoked(code); // Emit event for certificate revocation
//     // }

//     // // Function to get all certificate codes issued to a specific recipient
//     // function getCertificatesByRecipient(address recipient) public view returns (string[] memory) {
//     //     return recipientCertificates[recipient]; // Return the array of certificate codes
//     // }

//     // Internal function to generate a unique certificate code
//     function generateCertificateCode(address recipient, string memory data) internal view returns (string memory) {
//         bytes32 hash = keccak256(abi.encodePacked(block.timestamp, recipient, data));
//         return toHexString(hash);
//     }

//     // Internal function to convert bytes32 to string (hexadecimal representation)
//     function toHexString(bytes32 data) internal pure returns (string memory) {
//         bytes memory alphabet = "0123456789abcdef";
//         bytes memory str = new bytes(64);
//         for (uint256 i = 0; i < 32; i++) {
//             str[i*2] = alphabet[uint8(data[i] >> 4)];
//             str[1+i*2] = alphabet[uint8(data[i] & 0x0f)];
//         }
//         return string(str);
//     }
// }
