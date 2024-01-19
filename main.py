import random

class RubiksCube:
    def __init__(self):
        self.cube = [["W"] * 3 for _ in range(3)] + \
                    [["G"] * 3 + ["R"] * 3 + ["B"] * 3 + ["O"] * 3] * 3 + \
                    [["Y"] * 3 for _ in range(3)]
        self.colors = ["W", "G", "R", "B", "O", "Y"]

    def display_cube(self):
        for row in self.cube:
            print(" ".join(row))

    def rotate_face_clockwise(self, face):
        self.cube[face] = [self.cube[face][6]] + self.cube[face][:6]

    def rotate_face_counterclockwise(self, face):
        self.cube[face] = self.cube[face][1:] + [self.cube[face][0]]

    def rotate_row_left(self, row):
        temp = self.cube[row][0]
        self.cube[row][0] = self.cube[row][6]
        self.cube[row][6] = self.cube[row][8]
        self.cube[row][8] = self.cube[row][2]
        self.cube[row][2] = temp

    def rotate_row_right(self, row):
        temp = self.cube[row][0]
        self.cube[row][0] = self.cube[row][2]
        self.cube[row][2] = self.cube[row][8]
        self.cube[row][8] = self.cube[row][6]
        self.cube[row][6] = temp

    def shuffle_cube(self, moves=20):
        for _ in range(moves):
            move = random.choice(["U", "D", "L", "R", "F", "B"])
            self.perform_move(move)

    def perform_move(self, move):
        if move == "U":
            self.rotate_face_clockwise(0)
            self.rotate_row_left(3)
            self.rotate_row_left(4)
            self.rotate_row_left(5)
        elif move == "D":
            self.rotate_face_clockwise(6)
            self.rotate_row_right(3)
            self.rotate_row_right(4)
            self.rotate_row_right(5)
        elif move == "L":
            self.rotate_face_clockwise(3)
            self.rotate_row_left(0)
            self.rotate_row_left(1)
            self.rotate_row_left(2)
        elif move == "R":
            self.rotate_face_clockwise(5)
            self.rotate_row_right(0)
            self.rotate_row_right(1)
            self.rotate_row_right(2)
        elif move == "F":
            self.rotate_face_clockwise(1)
            temp = [self.cube[i][2] for i in range(3)]
            for i in range(3):
                self.cube[i][2] = self.cube[3 + i][2]
                self.cube[3 + i][2] = self.cube[6 + i][2]
                self.cube[6 + i][2] = self.cube[6 - i][6]
                self.cube[6 - i][6] = temp[i]
        elif move == "B":
            self.rotate_face_clockwise(4)
            temp = [self.cube[i][0] for i in range(3)]
            for i in range(3):
                self.cube[i][0] = self.cube[6 - i][8]
                self.cube[6 - i][8] = self.cube[6 + i][8]
                self.cube[6 + i][8] = self.cube[3 + i][0]
                self.cube[3 + i][0] = temp[i]

# Voorbeeld van gebruik:
cube = RubiksCube()
cube.shuffle_cube()
cube.display_cube()
