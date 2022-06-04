#!/usr/bin/python3

import socket

serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
host = socket.gethostname()
port = 9999

print('host:', host)
print('port:', port)

serversocket.bind((host, port))

serversocket.listen(5)

while True:
    clientsocket, address = serversocket.accept()
    print('Got a connection from', address)
    print('Socket is', clientsocket)
    msg = 'Thank you for connecting'
    clientsocket.send(msg.encode('utf-8'))
    clientsocket.close()
    